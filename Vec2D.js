class Vec2D {
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

    add(vec2D) {
        return new Vec2D(this.x + vec2D.x, this.y + vec2D.y);
    }

    getMultiplicatedVecBy(scalar) {
        return new Vec2D(this.x * scalar, this.y * scalar);
    }

    getNorm() {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }

    getNormalizedVec() {
        const norm = this.getNorm();
        return new Vec2D(this.x, this.y).getMultiplicatedVecBy(1 / norm);
    }

    getInverseVec() {
        return this.getMultiplicatedVecBy(-1);
    }

    //rotate by 90 degree anticlockwise
    getAntiClockwiseNormalVec() {
        return new Vec2D(this.y, - this.x);
    }

    getInnnerProductWith(vec2D) {
        return this.x * vec2D.x + this.y * vec2D.y;
    }

    //rotate by 90 degree clockwise
    getClockwiseNormalVec() {
        return new Vec2D(-this.y, this.x);
    }

    static getRandomNormalizedVec() {
        const randomAngle = Math.random() * 2 * Math.PI;
        return new Vec2D(Math.cos(randomAngle), Math.sin(randomAngle));
    }

    getVecRoteatedBy(radian) {
        const cos = Math.cos(radian);
        const sin = Math.sin(radian);
        return new Vec2D(this.x * cos - this.y * sin, this.x * sin + this.y * cos);
    }

    static getVec2DBy(fromV, toV) {
        return new Vec2D(toV.x - fromV.x, toV.y - fromV.y);
    }

}