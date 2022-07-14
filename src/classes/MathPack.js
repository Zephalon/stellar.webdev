// custom static functions
class MathPack {
    static getDistance(x1, y1, x2, y2) {
        let y = x2 - x1;
        let x = y2 - y1;

        return Math.sqrt(x * x + y * y);
    }

    static getAngle(x1, y1, x2, y2) {
        return Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);
    }

    static getElementBoundaries(element) {
        return !element ? null : element.getBoundingClientRect();
    }

    static randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    static clamp(number, min, max) {
        return Math.min(Math.max(number, min), max);
    }
}

export default MathPack;