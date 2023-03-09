const G = 6.6743e-11;

class PhysEngine {

    constructor(context, scale) {
        this._context = context;
        this._scale = scale;
        this.objects = [];
    }

    get context() {
        return this._context;
    }

    set context(newContext) {
        throw new Error("cannot do that :)");
    }

    /**
     * 
     * @param {number} dt change in time in seconds
     */
    update(dt) {
        for (const obj of this.objects) {

            obj.acc.set(0)
            for (const other of this.objects) {
                if (obj === other) {
                    continue;
                }
                const r = obj.pos.dist(other.pos);
                const a = (G * other.mass)/(r * r);
                obj.acc.iadd(other.pos.sub(obj.pos).unit().scale(a));
            }

            obj.vel.iadd(obj.acc.scale(dt));
            obj.pos.iadd(obj.vel.scale(dt));

            obj.draw(this.context, this._scale);
        }
    }
}