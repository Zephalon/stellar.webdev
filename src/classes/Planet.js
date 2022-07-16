import MathBook from "./MathBook.js";
import { Vector } from "p5"

class Planet {
    constructor(id, size_factor, sun) {
        // props
        this.id = id;
        this.sun = sun;
        this.size_factor = size_factor;

        // setup
        this.element = document.getElementById('folder-' + id);
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

        this.center = {
            x: Math.round(this.boundaries.left + this.boundaries.width * 0.5),
            y: Math.round(this.boundaries.top + this.boundaries.height * 0.5)
        };

        this.orbit = this.getOrbit();
        this.default_angle = Math.round(MathBook.getAngle(this.sun.x, this.sun.y, this.center.x, this.center.y));
        this.size = Math.min(this.boundaries.width, this.boundaries.height) * 1 * this.size_factor;
        this.speed_factor = (this.size + 1 / this.orbit) * 0.01; // ???
        this.acceleration = 0.001 * (1 / this.size);
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

        // get distance to light source
        let light_source_distance = MathBook.getDistance(light_source.x, light_source.y, position.x, position.y);
        light_source_distance = MathBook.clamp(light_source_distance, 0, 500)* intensity;


        let light_angle = Math.round(MathBook.getAngle(light_source.x, light_source.y, position.x, position.y));
        let shadow_vector = Vector.fromAngle(p5.radians(light_angle), light_source_distance * this.base_size);
        let shadow_vector_normalized = shadow_vector.copy().normalize();

        // move this code
        let pattern_density = 14;
        let pattern_size = 14;

        let ray_count = Math.floor(this.size * 0.5 * this.base_size / pattern_density);
        let dot_count = Math.floor(light_source_distance * this.base_size / pattern_density);

        [-90, 90].forEach(direction => {
            for (let ray = 0; ray <= ray_count; ray++) {
                let right_angle = shadow_vector_normalized.copy().rotate(direction);
                p5.strokeWeight(1);
                p5.stroke(color);

                let ray_position = {
                    x: position.x + right_angle.x * pattern_density * ray,
                    y: position.y + right_angle.y * pattern_density * ray
                }

                //p5.line(ray_position.x, ray_position.y, ray_position.x + shadow_vector.x, ray_position.y + shadow_vector.y);

                
                for (let dot = 1; dot <= dot_count; dot++) {
                    let dot_position = {
                        x: ray_position.x + shadow_vector_normalized.x * pattern_density * dot,
                        y: ray_position.y + shadow_vector_normalized.y * pattern_density * dot
                    }

                    // draw
                    p5.noStroke();
                    p5.fill(color);
                    p5.ellipse(dot_position.x, dot_position.y, pattern_size * (1 - (dot / dot_count)));
                }

                //p5.line(line_position.x, line_position.y, line_position.x + shadow_vector.x, line_position.y + shadow_vector.y);
                //console.log(shadow_vector);
            }

        });

        // draw
        p5.strokeWeight(this.size * this.base_size);
        p5.stroke(color);
        //p5.line(position.x, position.y, position.x + shadow_vector.x, position.y + shadow_vector.y);
    }

    // render the planet
    renderPlanet(p5, color, light_source = this.sun) {
        let position = this.getPosition();

        // draw
        p5.noStroke();
        p5.fill(color);
        p5.ellipse(position.x, position.y, this.size * this.base_size);
        p5.ellipse(this.center.x, this.center.y, 10); // position dot

        if (this.base_size < 1) {
            this.base_size += (1 - this.base_size) * 0.025;
            if (this.base_size > 1) this.base_size = 1; // cap at 1
        }
    }

    // move the planet
    move(orbit_sun = true) {
        let angle_to_default = Math.abs(this.angle - this.default_angle);
        if (this.angle > this.default_angle) angle_to_default = Math.abs(angle_to_default - 360);

        if (orbit_sun || angle_to_default > 300) {
            // orbit around the sun
            this.velocity += this.acceleration;
            this.speed += this.velocity;
            if (this.speed > this.max_speed) this.speed = this.max_speed;
            this.angle += this.speed;
        } else if (angle_to_default > 0) {
            // return to origin
            this.speed = angle_to_default * 0.2;
            this.angle += this.speed;
            if (angle_to_default < 0.1) this.angle = this.default_angle;
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