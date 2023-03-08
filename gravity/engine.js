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
            // for (const other in self.objects) {
            //     if (obj === other) {
            //         continue;
            //     }
            //     a = (G * other.mass)/obj.pos.dist(other.pos);
            //     other.acc.iadd(obj.pos.sub(other.pos).unit().scale(a));
            // }

            obj.vel.iadd(obj.acc.scale(dt));
            obj.pos.iadd(obj.vel.scale(dt));

            obj.draw(this.context, this._scale);
        }
    }
}