import MathPack from "./MathPack.js";

class MiniStar {
    constructor(size, speed, sun, color) {
        // props
        this.sun = sun;
        this.color = color;

        // setup
        this.proportional_orbit = Math.random();
        this.getOrbit();
        this.size = MathPack.randomInt(5, 10) * 0.1 * size;
        this.speed = this.size * 0.001 * speed * (1 - this.proportional_orbit);
        this.angle = MathPack.randomInt(-180, 180);

        window.addEventListener('resize', this.getOrbit.bind(this), true);
    }

    // get the orbit
    getOrbit() {
        this.orbit = this.proportional_orbit * document.documentElement.clientWidth + Math.abs(this.sun.x);
    }

    render(p5) {
        let position = {
            x: this.sun.x + this.orbit * Math.cos(this.angle),
            y: this.sun.y + this.orbit * Math.sin(this.angle)
        }
        if (position.y > document.documentElement.clientHeight) this.angle += 300;

        // draw
        p5.noStroke();
        p5.fill(this.color); //'#e1bd79'
        p5.ellipse(position.x, position.y, this.size);
        this.angle += this.speed;
    }
}

export default MiniStar;