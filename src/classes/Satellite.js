import MathBook from "./MathBook.js";
import Planet from "../classes/Planet.js";

class Satellite extends Planet {
    // render the planet
    renderPlanet(p5, color, light_source) {
        super.renderPlanet(p5, color, light_source);

        // ToDo: render satellite
        let position = this.getPosition();
        let light_angle = MathBook.getAngle(light_source.x, light_source.y, position.x, position.y);
    }
}

export default Satellite;