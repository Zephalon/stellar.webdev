import MathBook from "./MathBook.js";
import Easing from "./Easing.js";
import Planet from "./Planet.js";
import { Vector } from "p5"

class Moon extends Planet {
    constructor(id, sun) {
        super(id, sun);
    }
}

export default Moon;