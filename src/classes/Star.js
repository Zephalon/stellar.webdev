import MathBook from "./MathBook.js";
import { Vector } from "p5"

class Star {
    constructor(size, speed, sun, color, orbital = false) {
        // props
        this.sun = sun;
        this.color = color;
        this.orbital = orbital;

        this.position = {
            x: 0,
            y: 0
        }

        // setup
        this.proportional_orbit = Math.random();
        this.getOrbit();
        this.size = MathBook.randomInt(5, 10) * 0.1 * size;
        this.speed = orbital ? this.size * 0.001 * speed * (1 - this.proportional_orbit) : this.size * 0.001;
        this.angle = orbital ? MathBook.randomInt(-180, 180) : 0;
        this.vector = null;

        window.addEventListener('resize', this.getOrbit.bind(this), true);
    }

    // get the orbit
    getOrbit() {
        this.orbit = this.proportional_orbit * Math.max(document.documentElement.clientWidth, document.documentElement.clientHeight) + Math.max(Math.abs(this.sun.y), Math.abs(this.sun.x));

        return this;
    }

    // set starfield angle
    setAngle(p5, angle) {
        this.angel = angle;
        this.vector = Vector.fromAngle(p5.radians(angle), this.speed);

        return this;
    }

    // move to the next one and get current position 
    moveAndGetPosition() {
        if (this.orbital) {
            this.angle += this.speed;
            return {
                x: this.sun.x + this.orbit * Math.cos(this.angle),
                y: this.sun.y + this.orbit * Math.sin(this.angle)
            }
        } else {
            return {
                x: this.position.x + this.vector.x,
                y: this.position.y + this.vector.y,
            }
        }
    }

    render(p5, base_size = 1) {
        if (!base_size) return this;

        let position = this.moveAndGetPosition();

        // draw - if visible
        if (!this.orbital || MathBook.RectContainsPoint(position.x, position.y, p5.width, p5.height)) {
            p5.noStroke();
            p5.fill(this.color);
            p5.ellipse(position.x, position.y, (this.size * p5.noise(position.x, position.y) * 0.33) + (this.size * 0.67) * base_size);
        }

        this.position = position;

        return this;
    }
}

export default Star;