import MathBook from "./MathBook.js";
import { Vector } from "p5"

class Star {
    constructor(parent, size, speed) {
        // props
        this.parent = parent;

        this.position = {
            x: Math.round(MathBook.randomInt(0, document.documentElement.clientWidth)),
            y: Math.round(MathBook.randomInt(0, document.documentElement.clientHeight)),
        }

        // setup
        this.proportional_orbit = Math.random();
        this.getOrbit();
        this.size = MathBook.randomInt(5, 10) * 0.1 * size;
        this.speed = parent.orbital ? this.size * 0.001 * speed * (1 - this.proportional_orbit) : this.size * 0.1;
        this.angle = parent.orbital ? MathBook.randomInt(-180, 180) : 0;
        this.vector = null;

        window.addEventListener('resize', this.getOrbit.bind(this), true);
    }

    // get the orbit
    getOrbit() {
        this.orbit = this.proportional_orbit * Math.max(document.documentElement.clientWidth, document.documentElement.clientHeight) + Math.max(Math.abs(this.parent.sun.y), Math.abs(this.parent.sun.x));

        return this;
    }

    // set starfield angle
    setAngle(p5, angle) {
        this.angel = angle;
        this.vector = Vector.fromAngle(p5.radians(angle), this.speed);

        return this;
    }

    // move to the next one and get current position 
    moveAndGetPosition(p5) {
        if (this.parent.orbital) {
            this.angle += this.speed;
            return {
                x: this.parent.sun.x + this.orbit * Math.cos(this.angle),
                y: this.parent.sun.y + this.orbit * Math.sin(this.angle)
            }
        } else {
            let position = {
                x: this.position.x + this.vector.x,
                y: this.position.y + this.vector.y,
            }

            if (!MathBook.RectContainsPoint(position.x, position.y, p5.width, p5.height)) {
                position.x = p5.width - position.x;
                position.y = p5.height - position.y;
            }

            return position;
        }
    }

    render(p5, base_size = 1) {
        if (!base_size) return this;

        let position = this.moveAndGetPosition(p5);

        // draw - if visible
        if (!this.parent.orbital || MathBook.RectContainsPoint(position.x, position.y, p5.width, p5.height)) {
            p5.noStroke();
            p5.fill(this.parent.color);
            p5.ellipse(position.x, position.y, (this.size * p5.noise(position.x, position.y) * 0.33) + (this.size * 0.67) * base_size);
        }

        this.position = position;

        return this;
    }
}

export default Star;