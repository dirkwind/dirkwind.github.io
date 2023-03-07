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

}