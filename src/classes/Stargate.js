import MathBook from "./MathBook.js";
import Planet from "../classes/Planet.js";

class Stargate extends Planet {
    // render the planet
    renderPlanet(p5, color, light_source) {
        super.renderPlanet(p5, color, light_source);
    }
}

export default Stargate;