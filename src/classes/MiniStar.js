import MathBook from "./MathBook.js";

class MiniStar {
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
    }

    render(p5) {
        let position = {
            x: this.sun.x + this.orbit * Math.cos(this.angle),
            y: this.sun.y + this.orbit * Math.sin(this.angle)
        }

        // draw
        p5.noStroke();
        p5.fill(this.color); //'#e1bd79'
        p5.ellipse(position.x, position.y, this.size);
        this.angle += this.speed;
    }
}

export default MiniStar;