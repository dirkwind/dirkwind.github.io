class PhysObj {

    /**
     * 
     * @param {string} color
     * @param {number} mass 
     * @param {Vec2} pos 
     * @param {Vec2} vel 
     * @param {Vec2} acc 
     */
    constructor(color, mass, pos, vel = Vec2(0, 0), acc = Vec2(0, 0)) {
        this.color = color;
        this.mass = mass;
        this.pos = pos;
        this.vel = vel;
        this.acc = acc;
    }

    momentum() {
        return this.vel.copy().scale(this.mass);
    }

    copy() {
        return PhysObj(this.color, this.mass, this.pos, this.vel, this.acc);
    }

    checkCollision(other) {
        throw new Error("Not implemented");
    }

    /**
     * 
     * @param {CanvasRenderingContext2D} context 
     */
    draw(context) {
        throw new Error("Not implemented");
    }
}

class Circle extends PhysObj {

    /**
     * 
     * @param {string} color 
     * @param {number} radius 
     * @param {number} mass 
     * @param {Vec2} pos 
     * @param {Vec2} vel 
     * @param {Vec2} acc 
     */
    constructor(color, radius, mass, pos, vel = Vec2(0, 0), acc = Vec2(0, 0)) {
        super(color, mass, pos, vel, acc);
        this.radius = radius;
    }

    copy() {
        return Circle(this.radius, this.color, this.mass, this.pos, this.vel, this.acc);
    }

    checkCollision(other) {
        if (other instanceof Circle) {
            return (this.pos.dist(other.pos) - other.radius) <= this.radius
        }
        return false;
    }

    /**
     * 
     * @param {CanvasRenderingContext2D} context 
     * @param {Scale} scale
     */
    draw(context, scale) {
        const sc = scale.pixelsPerMeter();
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.pos.x * sc, this.pos.y * sc, this.radius * sc, 0, 2 * Math.PI);
        context.fill();
    }

}