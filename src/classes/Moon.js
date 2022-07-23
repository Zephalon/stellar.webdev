import Planet from "./Planet.js";

class Moon extends Planet {
    constructor(id, sun) {
        super(id, sun);
    }
}

export default Moon;