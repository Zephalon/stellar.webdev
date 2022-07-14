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
        this.orbit = Math.round(MathPack.getDistance(sun.x, sun.y, this.center.x, this.center.y));
        this.angle = Math.round(MathPack.getAngle(sun.x, sun.y, this.center.x, this.center.y));
        this.size = this.boundaries.width * 0.6 * size;
        this.speed = (this.size + 1 / this.orbit) * 0.01;
    }

    precalculated_positons = {};

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

    // render the planet (doh)
    renderPlanet(p5, color) {
        let position = this.getPosition(this.angle);

        // draw
        p5.noStroke();
        p5.fill(color);
        p5.ellipse(position.x, position.y, this.size);
    }

    // get the planets' position
    getPosition(angle) {
        if (this.precalculated_positons[angle]) return this.precalculated_positons[angle];

        let position = {
            x: this.sun.x + this.orbit * Math.cos(angle * this.speed),
            y: this.sun.y + this.orbit * Math.sin(angle * this.speed)
        }

        this.precalculated_positons[angle] = position; // do not recalculate to save cpu time

        return position;
    }
}

export default Planet;