import Star from "../classes/Star.js";
import settings from "../animation_settings.json";

class Starfield {
    constructor(size, speed, sun, color, count = settings.starfield.count, orbital = true) {
        this.stars = [];
        this.orbital = orbital;
        this.sun = sun;
        this.color = color;

        // create starfield
        for (let i = 0; i < count; i++) {
            this.stars.push(new Star(this, size, speed));
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