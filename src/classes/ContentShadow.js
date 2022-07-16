import MathBook from "./MathBook.js";

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
        this.boundaries = MathBook.getElementBoundaries(element);

        if (!this.boundaries) return null;

        let edges = [
            { x: Math.round(this.boundaries.left), y: Math.round(this.boundaries.top) },
            { x: Math.round(this.boundaries.left), y: Math.round(this.boundaries.top + this.boundaries.height) },
            { x: Math.round(this.boundaries.left + this.boundaries.width), y: Math.round(this.boundaries.top) },
            { x: Math.round(this.boundaries.left + this.boundaries.width), y: Math.round(this.boundaries.top + this.boundaries.height) }
        ];

        // sort by distance to 'sun'
        edges.map(edge => edge.distance = MathBook.getDistance(this.sun.x, this.sun.y, edge.x, edge.y));
        edges.sort((a, b) => (a.distance > b.distance) ? 1 : -1);

        this.edges = edges;
    }

    render(p5) {
        if (!this.active || !this.edges) return;

        // the two vectors to the closest folder edges
        let base_length = Math.max(document.documentElement.clientWidth, document.documentElement.clientHeight);
        let folder_vectors = [
            p5.createVector(this.edges[0].x - this.sun.x, this.edges[0].y - this.sun.y).normalize().setMag(base_length * this.folder_shadow_length * 0.05),
            p5.createVector(this.edges[1].x - this.sun.x, this.edges[1].y - this.sun.y).normalize().setMag(base_length * this.folder_shadow_length * 0.05),
        ];

        let pattern_density = 8;
        let pattern_size = 10;

        let edge_vector = p5.createVector(this.edges[0].x - this.edges[1].x, this.edges[0].y - this.edges[1].y).normalize();
        let edge_distance =  MathBook.getDistance(this.edges[0].x , this.edges[0].y, this.edges[1].x, this.edges[1].y);
        let edge_center = {
            x: (this.edges[0].x + this.edges[1].x) * 0.5,
            y: (this.edges[0].y + this.edges[1].y) * 0.5
        };

        let ray_count = Math.ceil((edge_distance - (pattern_size - pattern_density)) * 0.5 / (pattern_density * 0.5));
        let dot_count = Math.floor(this.boundaries.width * 0.5 / pattern_density);

        //ray_count = 1;

        //console.log('count: ' + ray_count + '/' + dot_count);

        [1, -1].forEach(direction => {
            for (let ray = 0; ray < ray_count; ray++) {
                // start postion of the ray
                let ray_position = {
                    x: edge_center.x + edge_vector.x * ray * pattern_density * direction * 0.5,
                    y: edge_center.y + edge_vector.y * ray * pattern_density * direction * 0.5,
                }

                let shadow_vector = p5.createVector(ray_position.x - this.sun.x, ray_position.y - this.sun.y).normalize();
                let shadow_vector_normalized = shadow_vector.copy().normalize();

                if (ray % 2 === 0) {
                    ray_position.x += shadow_vector_normalized.x * 0.5 * pattern_density;
                    ray_position.y += shadow_vector_normalized.y * 0.5 * pattern_density;
                }

                p5.stroke("black");
                p5.strokeWeight(1);
                //p5.line(ray_position.x, ray_position.y, ray_position.x + shadow_vector.x * this.boundaries.width, ray_position.y + shadow_vector.y * this.boundaries.width);
                
                // create the dots
                for (let dot = 1; dot < dot_count; dot++) {
                    // to postion on ray
                    let dot_position = {
                        x: ray_position.x + shadow_vector_normalized.x * pattern_density * dot,
                        y: ray_position.y + shadow_vector_normalized.y * pattern_density * dot
                    }

                    // draw
                    p5.noStroke();
                    p5.fill(this.color);
                    p5.ellipse(dot_position.x, dot_position.y, pattern_size * (1 - (dot / dot_count)));
                    
                }
            }
        });
        
        //let ray_count = Math.ceil((this.size - 2 - (pattern_size - pattern_density)) * 0.5 * this.base_size / pattern_density);
        //let dot_count = Math.floor(shadow_length * this.base_size / pattern_densi

        // draw
        /*p5.fill(this.color);
        p5.beginShape();
        p5.vertex(this.edges[0].x, this.edges[0].y);
        p5.vertex(this.edges[0].x + folder_vectors[0].x, this.edges[0].y + folder_vectors[0].y);
        p5.vertex(this.edges[1].x + folder_vectors[1].x, this.edges[1].y + folder_vectors[1].y);
        p5.vertex(this.edges[1].x, this.edges[1].y);
        p5.endShape(p5.CLOSE);*/

        this.folder_shadow_length = this.folder_shadow_length >= 20 ? 20 : ++this.folder_shadow_length; // increment for animation
    }
}

export default ContentShadow;