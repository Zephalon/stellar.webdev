import MathPack from "./MathPack.js";

class MiniStar {
    constructor(size, speed, sun, canvas, color) {
        // props
        this.sun = sun;
        this.color = color;
        this.canvas = canvas;

        // setup
        this.orbit = this.getOrbit();
        this.size = MathPack.randomInt(5, 10) * 0.1 * size;
        this.speed = MathPack.randomInt(50, 100) * 0.1 * speed;
        this.angle = MathPack.randomInt(-180, 180);
    }

    // get the orbit
    getOrbit() {
        return Math.random() * this.canvas.width + Math.abs(this.sun.x);
    }

    render(p5) {
        let position = {
            x: this.sun.x + this.orbit * Math.cos(this.angle),
            y: this.sun.y + this.orbit * Math.sin(this.angle)
        }
        if (position.y > this.canvas.height) this.angle += 300;

        // draw
        p5.noStroke();
        p5.fill(this.color); //'#e1bd79'
        p5.ellipse(position.x, position.y, this.size);
        this.angle += this.speed;
    }
}

export default MiniStar;