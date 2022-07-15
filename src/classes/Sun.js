import MathPack from "./MathPack.js";

class Sun {
    constructor(id, color) {
        // props
        this.id = id;
        this.color = color;

        // setup
        this.element = document.getElementById(id);

        this.calculatePosition();

        window.addEventListener('resize', this.calculatePosition.bind(this), true);
    }

    // calculate the suns' center
    calculatePosition() {
        this.boundaries = MathPack.getElementBoundaries(this.element);

        this.x = Math.round(this.boundaries.left + this.boundaries.width * 0.5);
        this.y = Math.round(this.boundaries.top + this.boundaries.height * 0.5);
    }

    render(p5) {
        // draw
        p5.noStroke();
        p5.fill(this.color);
        p5.ellipse(this.x, this.y, this.boundaries.width);
    }
}

export default Sun;