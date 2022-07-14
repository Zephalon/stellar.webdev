import MathPack from "./MathPack.js";

class ContentShadow {
    constructor(id, sun, color) {
        // props
        this.id = id;
        this.sun = sun;
        this.color = color;

        // setup
        this.folder_shadow_length = 0;
    }

    // set the status
    setStatus(active) {
        if (active) {
            this.active = true;
            this.getElement(this.id);
        } else {
            this.active = false;
            this.folder_shadow_length = 0;
        }
    }

    // get content window
    getElement(id) {
        let element = document.getElementById(id);
        let boundaries = MathPack.getElementBoundaries(element);

        let edges = [
            { x: Math.round(boundaries.left), y: Math.round(boundaries.top) },
            { x: Math.round(boundaries.left), y: Math.round(boundaries.top + boundaries.height) },
            { x: Math.round(boundaries.left + boundaries.width), y: Math.round(boundaries.top + boundaries.height) },
            { x: Math.round(boundaries.left + boundaries.width), y: Math.round(boundaries.top + boundaries.height) }
        ];

        // sort by distance to 'sun'
        edges.map(edge => edge.distance = MathPack.getDistance(this.sun.x, this.sun.y, edge.x, edge.y));
        edges.sort((a, b) => (a.distance > b.distance) ? 1 : -1);

        this.edges = edges;
    }

    render(p5) {
        if (!this.active) return;

        // the two vectors to the closest folder edges
        let folder_vectors = [
            p5.createVector(this.edges[0].x - this.sun.x, this.edges[0].y - this.sun.y).normalize().setMag(document.documentElement.clientWidth * this.folder_shadow_length * 0.05),
            p5.createVector(this.edges[1].x - this.sun.x, this.edges[1].y - this.sun.y).normalize().setMag(document.documentElement.clientWidth * this.folder_shadow_length * 0.05),
        ];

        // draw
        p5.fill(this.color);
        p5.beginShape();
        p5.vertex(this.edges[0].x, this.edges[0].y);
        p5.vertex(this.edges[0].x + folder_vectors[0].x, this.edges[0].y + folder_vectors[0].y);
        p5.vertex(this.edges[1].x + folder_vectors[1].x, this.edges[1].y + folder_vectors[1].y);
        p5.vertex(this.edges[1].x, this.edges[1].y);
        p5.endShape(p5.CLOSE);

        this.folder_shadow_length = this.folder_shadow_length >= 20 ? 20 : ++this.folder_shadow_length; // increment for animation
    }
}

export default ContentShadow;