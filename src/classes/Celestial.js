import MathBook from "./MathBook.js";
import Easing from "./Easing.js";

class Celestial {
    constructor(id, color, el_origin = null) {
        // props
        this.id = id;
        this.color = color;

        // setup
        this.element = document.getElementById(id);
        this.getBoundaries();
        this.setOriginElement(el_origin);

        window.addEventListener('resize', this.getBoundaries.bind(this), true);
    }

    // calculate the suns' center
    getBoundaries() {
        let boundaries = MathBook.getElementBoundaries(this.element);
        if (!boundaries) return false;
        let { left, top, width, height } = boundaries;

        this.x = Math.round(left + width * 0.5);
        this.y = Math.round(top + height * 0.5);
        this.size = width;
    }

    // set the animation origin for smooth transition
    setOriginElement(el_origin) {
        if (!el_origin) return null;

        let { left, top, width, height } = MathBook.getElementBoundaries(el_origin);

        this.origin = {
            x: Math.round(left + width * 0.5),
            y: Math.round(top + height * 0.5),
            size: Math.round(Math.min(width, height))
        }
    }

    render(p5, base_size = 1, animate_origin = false) {
        // get current position
        let {x, y, size} = this;

        if (this.origin && base_size < 1 && animate_origin) {
            let ease = Easing.easeInOutQuad(base_size);
            let ease_inverted = 1 - ease;

            x = x * ease + this.origin.x * ease_inverted;
            y = y * ease + this.origin.y * ease_inverted;
            size = this.origin.size + (size - this.origin.size) * ease;
        } else {
            size *= Easing.easeInOutQuad(base_size);
        }

        // console.log(x + '/' + y + '/' + size);

        // draw
        p5.noStroke();
        p5.fill(this.color);
        p5.ellipse(x, y, size);
    }
}

export default Celestial;