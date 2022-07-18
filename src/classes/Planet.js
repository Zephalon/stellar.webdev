import MathBook from "./MathBook.js";
import { Vector } from "p5"

class Planet {
    constructor(id, size_factor, sun) {
        // props
        this.id = id;
        this.sun = sun;
        this.size_factor = size_factor ? size_factor : 1;

        // setup
        this.element = document.getElementById(id);
        this.base_size = 0; // for animation

        this.planetaryCalculations();

        // current state
        this.angle = this.default_angle;
        this.velocity = 0;
        this.speed = 0;

        window.addEventListener('resize', this.planetaryCalculations.bind(this), true);
    }

    precalculated_positons = {}; // position lookup table

    // calculate the planets' center
    planetaryCalculations() {
        this.boundaries = MathBook.getElementBoundaries(this.element);

        // check if element was found (failsafe)
        if (!this.boundaries) {
            console.warn('Invalid element ID provided: #' + this.id);
            return null;
        }

        this.center = {
            x: Math.round(this.boundaries.left + this.boundaries.width * 0.5),
            y: Math.round(this.boundaries.top + this.boundaries.height * 0.5)
        };

        this.orbit = this.getOrbit();
        this.default_angle = Math.round(MathBook.getAngle(this.sun.x, this.sun.y, this.center.x, this.center.y));
        this.size = Math.round(Math.min(this.boundaries.width, this.boundaries.height) * 1 * this.size_factor);
        this.speed_factor = (this.size + 1 / this.orbit) * 0.01; // ???
        this.acceleration = 0.001 * (1 / Math.sqrt(this.size));
        this.max_speed = (this.size + 1 / this.orbit) * 0.001;

        this.precalculated_positons = {};
    }

    // get the orbit
    getOrbit() {
        return Math.round(MathBook.getDistance(this.sun.x, this.sun.y, this.center.x, this.center.y));
    }

    // render the planet's orbit (line)
    renderOrbit(p5, color) {
        // draw
        p5.stroke(color);
        p5.strokeWeight(2 * this.base_size);
        p5.noFill();
        p5.ellipse(this.sun.x, this.sun.y, this.orbit * 2);
    }

    // render the planets shadow, based on the light source
    renderShadow(p5, color, light_source = this.sun, intensity = 1) {
        let position = this.getPosition();

        if (!light_source.x && !light_source.y) return false;

        // get distance to light source
        let light_source_distance = MathBook.getDistance(light_source.x, light_source.y, position.x, position.y);
        let shadow_length = MathBook.clamp(500 - light_source_distance, this.size * 1, this.size * 2.25);

        // get angle to light source and the ray it casts
        let light_angle = Math.round(MathBook.getAngle(light_source.x, light_source.y, position.x, position.y));
        let shadow_vector = Vector.fromAngle(p5.radians(light_angle), shadow_length * this.base_size);
        let shadow_vector_normalized = shadow_vector.copy().normalize();

        // ToDo: move this code to improve performance
        let pattern_density = 8;
        let pattern_size = 10;

        let ray_count = Math.ceil((this.size - 2 - (pattern_size - pattern_density)) * 0.5 * this.base_size / pattern_density);
        let dot_count = Math.floor(shadow_length * this.base_size / pattern_density);

        [1, -1].forEach(direction => {
            for (let ray = 0; ray < ray_count; ray++) {
                // let right_angle = shadow_vector_normalized.copy().rotate(direction);
                let right_angle = {
                    x: shadow_vector_normalized.y * direction,
                    y: shadow_vector_normalized.x * direction * -1
                }

                // draw at (approximately...) the planet's border
                let ray_offset = Math.floor(Math.sin((90 * (1 - (ray + 1) / ray_count)) * (Math.PI / 180)) * this.size * 0.5) * this.base_size * 0.8;
                ray_offset = Math.round(ray_offset / pattern_size) * pattern_size; // pin to grid
                ray_offset += ray % 2 === 0 ? 0 : pattern_size * 0.5; // offset every second ray by half density

                // start postion of the ray
                let ray_position = {
                    x: position.x + right_angle.x * pattern_density * ray + shadow_vector_normalized.x * ray_offset,
                    y: position.y + right_angle.y * pattern_density * ray + shadow_vector_normalized.y * ray_offset
                }
                
                // create the dots
                for (let dot = 1; dot < dot_count; dot++) {
                    // to postion on ray
                    let dot_position = {
                        x: ray_position.x + shadow_vector_normalized.x * pattern_density * dot,
                        y: ray_position.y + shadow_vector_normalized.y * pattern_density * dot
                    }

                    // draw
                    p5.noStroke();
                    p5.fill(color);
                    p5.ellipse(dot_position.x, dot_position.y, pattern_size * (1 - (dot / dot_count)));
                }
            }
        });
    }

    // render the planet
    renderPlanet(p5, color, light_source = this.sun) {
        let position = this.getPosition();

        // draw
        p5.noStroke();
        p5.fill(color);
        p5.ellipse(position.x, position.y, this.size * this.base_size);

        if (this.base_size < 1) {
            this.base_size += (1 - this.base_size) * 0.1;
            if (this.base_size > 1) this.base_size = 1; // cap at 1
        }
    }

    // move the planet
    move(orbit_sun = true) {
        let angle_to_default = Math.abs(this.angle - this.default_angle);
        if (this.angle > this.default_angle) angle_to_default = Math.abs(angle_to_default - 360);
        if (angle_to_default > 180) angle_to_default -= 360;

        if (orbit_sun) {
            // orbit around the sun
            this.velocity += this.acceleration;
            this.speed += this.velocity;
            if (this.speed > this.max_speed) this.speed = this.max_speed;
            this.angle += this.speed;
        } else if (angle_to_default !== 0) {
            // return to origin
            this.speed = angle_to_default * 0.1;
            this.angle += this.speed;
            if (Math.abs(angle_to_default) < 0.1) this.angle = this.default_angle;
        }

        if (this.angle > 360) this.angle -= 360;
    }

    // get the planets' position
    getPosition(angle = this.angle) {
        angle = Math.round(angle * 100) * 0.01; // make it reasonable to precalculate
        if (this.precalculated_positons[angle]) return this.precalculated_positons[angle];

        let position = {
            x: this.sun.x + this.orbit * Math.cos(angle * 0.0174533),
            y: this.sun.y + this.orbit * Math.sin(angle * 0.0174533)
        }

        this.precalculated_positons[angle] = position; // do not recalculate to save cpu time

        return position;
    }
}

export default Planet;