import MathBook from "./MathBook.js";

class Pattern {
    constructor(color) {
        // props
        this.color = color;
    }

    async render(p5) {
        let pattern_density = 8;
        let pattern_size = 10;

        let dots_x = Math.ceil(p5.width / pattern_density);
        let dots_y = Math.ceil(p5.height / pattern_density);

        for (let dot_x = 0; dot_x < dots_x; dot_x++) {
            for (let dot_y = 0; dot_y < dots_y; dot_y++) {
                let position = {
                    x: dot_x * pattern_density + (dot_y % 2 === 0 ? 0 : pattern_density * 0.5),
                    y: dot_y * pattern_density
                };

                let size = ((p5.width > p5.height) ? dot_x / dots_x : dot_y / dots_y) - 0.33;
                size *= size < 0 ? 0 : 1.5;

                // draw
                p5.noStroke();
                p5.fill(this.color);
                p5.ellipse(position.x, position.y, pattern_size * size); // * p5.noise(dot_x, dot_y) * 2);
            }
        }
    }
}

export default Pattern;