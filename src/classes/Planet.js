import MathPack from "./MathPack.js";
import { Vector } from "p5"

class Planet {
    constructor(id, size, sun) {
        // props
        this.id = id;
        this.sun = sun;

        // setup
        this.element = document.getElementById('folder-' + id);
        this.boundaries = MathPack.getElementBoundaries(this.element);
        this.center = {
            x: Math.round(this.boundaries.left + this.boundaries.width * 0.5),
            y: Math.round(this.boundaries.top + this.boundaries.height * 0.5)
        };
        this.orbit = this.getOrbit();
        this.default_angle = Math.round(MathPack.getAngle(sun.x, sun.y, this.center.x, this.center.y));
        this.size = this.boundaries.width * 0.6 * size;

        this.speed_factor = (this.size + 1 / this.orbit) * 0.01; // ???

        this.acceleration = 0.001 * (1 / this.size);
        this.max_speed = (this.size + 1 / this.orbit) * 0.005;

        // current state
        this.angle = this.default_angle;
        this.velocity = 0;
        this.speed = 0;
    }

    precalculated_positons = {};

    // get the orbit
    getOrbit() {
        return Math.round(MathPack.getDistance(this.sun.x, this.sun.y, this.center.x, this.center.y));
    }

    // render the planet's orbit (line)
    renderOrbit(p5, color) {
        // draw
        p5.stroke(color);
        p5.strokeWeight(3);
        p5.noFill();
        p5.ellipse(this.sun.x, this.sun.y, this.orbit * 2);
    }

    // render the planets shadow, based on the light source
    renderShadow(p5, color, light_source) {
        let position = this.getPosition(this.angle);
        let light_source_distance = MathPack.getDistance(light_source.x, light_source.y, position.x, position.y);
        let light_angle = MathPack.getAngle(light_source.x, light_source.y, position.x, position.y);
        let shadow_vector = Vector.fromAngle(p5.radians(light_angle), light_source_distance);

        // draw
        p5.strokeWeight(this.size * 1);
        p5.stroke(color);
        p5.line(position.x, position.y, position.x + shadow_vector.x, position.y + shadow_vector.y);
    }

    // render the planet
    renderPlanet(p5, color) {
        let position = this.getPosition(this.angle);

        // draw
        p5.noStroke();
        p5.fill(color);
        p5.ellipse(position.x, position.y, this.size);
    }

    // move the planet
    move(orbit_sun) {
        let angle_to_default = Math.abs(this.angle - this.default_angle);
        if (this.angle > this.default_angle) angle_to_default = Math.abs(angle_to_default - 360)

        // console.log(this.default_angle + ' / ' + this.angle + ' / ' + angle_to_default);

        if (orbit_sun || (angle_to_default > 0 && this.angle < angle_to_default + 45)) {
            // orbit around the sun
            this.velocity += this.acceleration;
            this.speed += this.velocity;
            if (this.speed > this.max_speed) this.speed = this.max_speed;
            this.angle += this.speed;
        } else if (angle_to_default > 0) {
            // return to origin
            this.speed = angle_to_default * 0.25;
            if (this.speed > this.max_speed * 10) this.speed = this.max_speed * 10;
            this.angle += this.speed;
            if (angle_to_default < 0.1) this.angle = 0;
        }

        if (this.angle > 360) this.angle -= 360;
    }

    // get the planets' position
    getPosition(angle) {
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