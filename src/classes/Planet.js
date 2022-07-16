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
        this.base_size = 0;

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
    renderShadow(p5, color, light_source = this.sun) {
        let position = this.getPosition();
        let light_source_distance = MathBook.getDistance(light_source.x, light_source.y, position.x, position.y);
        let light_angle = MathBook.getAngle(light_source.x, light_source.y, position.x, position.y);
        let shadow_vector = Vector.fromAngle(p5.radians(light_angle), light_source_distance * this.base_size);

        // draw
        p5.strokeWeight(this.size * this.base_size);
        p5.stroke(color);
        p5.line(position.x, position.y, position.x + shadow_vector.x, position.y + shadow_vector.y);
    }

    // render the planet
    renderPlanet(p5, color, light_source = this.sun) {
        let position = this.getPosition();

        // draw
        p5.noStroke();
        p5.fill(color);
        p5.ellipse(position.x, position.y, this.size * this.base_size);

        p5.ellipse(this.center.x, this.center.y, 10);

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