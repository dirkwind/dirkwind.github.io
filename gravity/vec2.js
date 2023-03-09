class Vec2 {

    /**
     * 
     * @param {number} x 
     * @param {number} y 
     */
    constructor(x = 0, y = 0) {
        this.set(x, y);
    }

    set(x, y) {
        if (y == null) {
            y = x;
        }
        this.x = x;
        this.y = y;
    }

    /**
     * 
     * @param {number|Vector} x 
     * @param {number|undefined} y 
     */
    iadd(x, y) {
        if (y !== undefined) {
            this.x += x;
            this.y += y;
        } else { // x is a vector
            this.x += x.x;
            this.y += x.y;
        }
    }

    /**
     * 
     * @param {number|Vector} x 
     * @param {number|undefined} y 
     */
    add(x, y) {
        if (y !== undefined) {
            return new this(this.x + x, this.y + y)
        }
        // x is a vector
        return new Vec2(this.x + x.x, this.y + x.y)
    }

    /**
     * 
     * @param {number|Vec2} x 
     * @param {number?} y 
     */
    isub(x, y) {
        if (y !== undefined) {
            this.x -= x;
            this.y -= y;
        } else { // x is a vector
            this.x -= x.x;
            this.y -= x.y;
        }
    }

    /**
     * 
     * @param {number|Vec2} x 
     * @param {number?} y 
     */
    sub(x, y) {
        if (y !== undefined) {
            return new this(this.x - x, this.y - y)
        }
        // x is a vector
        return new Vec2(this.x - x.x, this.y - x.y)
    }

    inverse() {
        return new Vec2(-this.x, -this.y);
    }

    iscale(x, y) {
        if (y == null) {
            y = x;
        }
        this.x *= x;
        this.y *= y;
    }

    scale(x, y) {
        if (y == null) {
            y = x;
        }
        return new Vec2(this.x * x, this.y * y);
    }

    /**
     * 
     * @param {Vec2} other 
     * @returns {number} The dot product of this and other
     */
    dot(other) {
        return this.x * other.x + this.y * other.y;
    }

    /**
     * 
     * @param {Vec2} other 
     * @returns {boolean} true if other and this are orthogonal, false otherwise
     */
    orthogonalTo(other) {
        return this.dot(other) == 0;
    }

    dist(other) {
        return this.sub(other).magnitude();
    }

    /**
     * 
     * @returns {Vec2} This vector's corresponding unit vector
     */
    unit() {
        const mag = this.magnitude();
        return new Vec2(this.x / mag, this.y / mag);
    }

    /**
     * 
     * @returns {number} the magnitude or norm of this vector
     */
    magnitude() {
        return Math.sqrt(this.dot(this));
    }

    copy() {
        return new Vec2(this.x, this.y);
    }

    toString() {
        return `(${this.x}, ${this.y})`;
    }

    print() {
        console.log(`(${this.x}, ${this.y})`);
    }
}