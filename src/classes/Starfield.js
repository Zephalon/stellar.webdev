import MathBook from "./MathBook.js";
import Star from "../classes/Star.js";
import settings from "../animation_settings.json";

class Starfield {
    constructor(size, speed, sun, color) {
        this.stars = [];

        // create starfield
        for (let i = 0; i < settings.starfield.count; i++) {
            this.stars.push(new Star(size, speed, sun, color));
        };
    }

    render(p5, base_size) {
        this.stars.forEach(star => star.render(p5, base_size)); // render the starfield

        return this;
    }
}

export default Starfield;