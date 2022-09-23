//this class represent "static" vertex
class Vertex {
    constructor(x, y) {
        Object.defineProperty(
            this,
            'x', {
              value: x
            }
        );
        Object.defineProperty(
            this,
            'y', {
              value: y
            }
        );
    }

    static getMiddleVertexBetween(v1, v2) {
        return new Vertex((v1.x + v2.x) / 2, (v1.y + v2.y) / 2);
    }

    getVertexActionedBy(vec2D) {
        return new Vertex(this.x + vec2D.x, this.y + vec2D.y);
    }

    getDistanceBetween(vertex) {
        return Math.sqrt(Math.pow(this.x - vertex.x, 2) + Math.pow(this.y - vertex.y, 2));
    }

    getAllAdjacentEdgesBy(plane) {
        const edges = new Set();
        plane.edges.forEach((edge) => {
            if(edge.has(this)) {
                edges.add(edge);
            }
        });
        return edges;
    }

    getAllAdjacentEdgesNotSandwichedFrom(plane) {
        const result = new Set();
        const edges = this.getAllAdjacentEdgesBy(plane);
        edges.forEach((edge) => {
            if(!edge.isSandwichedByPolygon(plane)) {
                result.add(edge);
            }
        });
        return result;
    }

    getDegreeBy(plane) {
        return this.getAllAdjacentEdgesBy(plane).size;
    }

    geAroundtAllPolygonsBy(plane) {
        const polygons = new Set();
        plane.triangles.forEach((triangle) => {
            if(triangle.hasV(this)) {
                polygons.add(triangle);
            }
        });
        plane.rectangles.forEach((rectangle) => {
            if(rectangle.hasV(this)) {
                polygons.add(rectangle);
            }
        });
        return polygons;
    }

    geAroundtAllTrianglesBy(plane) {
        const triangles = new Set();
        plane.triangles.forEach((triangle) => {
            if(triangle.hasV(this)) {
                triangles.add(triangle);
            }
        });
        return triangles;
    }


    geAroundtAllRectanglesBy(plane) {
        const rectangles = new Set();
        plane.rectangles.forEach((rectangle) => {
            if(rectangle.hasV(this)) {
                rectangles.add(rectangle);
            }
        });
        return rectangles;
    }

    getAroundPolygonNumBy(plane) {
        return this.geAroundtAllPolygonsBy(plane).size;
    }

    getAroundTriangleNumBy(plane) {
        return this.geAroundtAllTrianglesBy(plane).size;
    }

    getAroundRectangleNumBy(plane) {
        return this.geAroundtAllRectanglesBy(plane).size;
    }

    getOhterVertexOf(edge) {
        if(edge.v1 === this) {
            return edge.v2;
        } else if(edge.v2 === this) {
            return edge.v1;
        } else {
            throw new Error('vertex is not included in this edge');
        }
    }

    static getRectangleVertexOppositeSideOf(vertex, edge, triangle) {
        const ohterVertex = vertex.getOhterVertexOf(edge);
        const vec2D = Vec2D.getVec2DBy(vertex, ohterVertex);
        const vec2DToCenter = Vec2D.getVec2DBy(vertex, triangle.getCenter());
        if(vec2D.getAntiClockwiseNormalVec().getInnnerProductWith(vec2DToCenter) < 0) {
            return vertex.getVertexActionedBy(vec2D.getAntiClockwiseNormalVec());
        } else {
            return vertex.getVertexActionedBy(vec2D.getClockwiseNormalVec());
        }
    }

    getVertexesOtherThanMySelfFrom(vertexes) {
        const vertexesOtherThanMySelf = new Set();
        vertexes.forEach((vertex) => {
            if(vertex !== this) {
                vertexesOtherThanMySelf.add(vertex);
            }
        });
        return vertexesOtherThanMySelf;
    }

    static getTheOtherVertexOfRhombusFrom(middleVertex, vertex1, vertex2) {
        const mid = Vertex.getMiddleVertexBetween(vertex1, vertex2);
        return middleVertex.getVertexActionedBy(Vec2D.getVec2DBy(middleVertex, mid).getMultiplicatedVecBy(2));
    }

}
