import MathBook from "./MathBook.js";
import Star from "../classes/Star.js";
import settings from "../animation_settings.json";

class Starfield {
    constructor(size, speed, sun, color, orbital = true) {
        this.stars = [];

        // create starfield
        for (let i = 0; i < settings.starfield.count; i++) {
            this.stars.push(new Star(size, speed, sun, color, orbital));
        };
    }

    setAngle(p5, angle) {
        this.stars.forEach(star => star.setAngle(p5, angle));

        return this;
    }

    render(p5, base_size) {
        this.stars.forEach(star => star.render(p5, base_size)); // render the starfield

        return this;
    }
}

export default Starfield;