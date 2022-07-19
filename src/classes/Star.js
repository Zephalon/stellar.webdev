import MathBook from "./MathBook.js";

class Star {
    constructor(size, speed, sun, color) {
        // props
        this.sun = sun;
        this.color = color;

        // setup
        this.proportional_orbit = Math.random();
        this.getOrbit();
        this.size = MathBook.randomInt(5, 10) * 0.1 * size;
        this.speed = this.size * 0.001 * speed * (1 - this.proportional_orbit);
        this.angle = MathBook.randomInt(-180, 180);

        window.addEventListener('resize', this.getOrbit.bind(this), true);
    }

    // get the orbit
    getOrbit() {
        this.orbit = this.proportional_orbit * Math.max(document.documentElement.clientWidth, document.documentElement.clientHeight) + Math.max(Math.abs(this.sun.y), Math.abs(this.sun.x));

        return this;
    }

    render(p5, base_size = 1) {
        if (!base_size) return this;

        let position = {
            x: this.sun.x + this.orbit * Math.cos(this.angle),
            y: this.sun.y + this.orbit * Math.sin(this.angle)
        }

        // draw - if visible
        if (MathBook.RectContainsPoint(position.x, position.y, p5.width, p5.height)) {
            p5.noStroke();
            p5.fill(this.color);
            p5.ellipse(position.x, position.y, (this.size * p5.noise(position.x, position.y) * 0.33) + (this.size * 0.67) * base_size);
        }

        this.angle += this.speed;

        return this;
    }
}

export default Star;