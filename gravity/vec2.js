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
     * Adds x and y to this vector in-place
     * @param {number|Vec2} x The x component of the vector to be added, or the vector to be added itself
     * @param {number|undefined} y the y component of the vector to be added. Do not provide this if x is a vector.
     */
    iadd(x, y) {
        if (x instanceof Vec2) {
            this.x += x.x;
            this.y += x.y;
        } else {
            this.x += x;
            this.y += y;
        }
    }

    /**
     * Adds this vector to x and y or another vector and returns the result as a new vector.
     * @param {number|Vector} x The x component of the vector to be subtracted, or the vector to be subtracted itself
     * @param {number|undefined} y the y component of the vector to be subtracted. Do not provide this if x is a vector.
     * @returns {Vec2} the sum of this vector and (x, y) or the vector x
     */
    add(x, y) {
        if (y !== undefined) {
            return new this(this.x + x, this.y + y)
        }
        // x is a vector
        return new Vec2(this.x + x.x, this.y + x.y)
    }

    /**
     * Subtracts (x, y) or the vector x from this vector, in place.
     * @param {number|Vec2} x The x component of the vector to be subtracted, or the vector to be subtracted itself
     * @param {number?} y the y component of the vector to be subtracted. Do not provide this if x is a vector.
     */
    isub(x, y) {
        if (x instanceof Vec2) {
            this.x -= x.x;
            this.y -= x.y;
        } else {
            this.x -= x;
            this.y -= y; 
        }
    }

    /**
     * Subtracts (x, y) or the vector x from this vector, returning the result as a new vector.
     * @param {number|Vec2} x The x component of the vector to be subtracted, or the vector to be subtracted itself
     * @param {number?} y the y component of the vector to be subtracted. Do not provide this if x is a vector.
     * @returns {Vec2} The difference between this vector and (x, y) or the vector x
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

    /**
     * Scalar multiplication; the scale of each component can be specified. Scaling is done in place.
     * @param {number} x The x scale factor, or the scale factor of x and y if y is not provided.
     * @param {number?} y The y scale factor.
     */
    iscale(x, y) {
        if (y == null) {
            y = x;
        }
        this.x *= x;
        this.y *= y;
    }

    /**
     * Scalar multiplication; the scale of each component can be specified.
     * @param {number} x The x scale factor, or the scale factor of x and y if y is not provided.
     * @param {number?} y The y scale factor.
     * @returns {Vec2} The scaled vector
     */
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

    /**
     * 
     * @param {Vec2} other 
     * @returns {number} The distance between this and other
     */
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
        console.log(this.toString());
    }
}