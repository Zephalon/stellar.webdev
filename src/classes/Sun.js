import Celestial from "./Celestial.js";

class Sun extends Celestial {
    constructor(id, color, el_origin = null) {
        super(id, color, el_origin);
    }
}

export default Sun;