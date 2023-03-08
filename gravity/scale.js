/**
 * Keeps track of a ratio between pixels and meters
 */
class Scale {

    /**
     * 
     * @param {number} meters 
     * @param {number} pixels 
     */
    constructor(meters = 1, pixels = 1) {
        this._meters = meters;
        this._pixels = pixels;
    }

    get meters() {
        return self._meters;
    }

    set meters(newVal) {
        if (!(newVal instanceof Number) || newVal < 0)
            throw new Error("Meters must be a positive number.");

        self._meters = newVal;
    }

    get pixels() {
        return self._pixels;
    }

    set pixels(newVal) {
        if (!(newVal instanceof Number) || newVal < 0)
            throw new Error("Meters must be a positive number.");

        self._pixels = newVal;
    }

    /**
     * 
     * @returns {number} the ratio between meters and pixels
     */
    metersPerPixel() {
        return this._meters/this._pixels;
    }

    /**
     * 
     * @returns {number} the ratio between pixels and meters
     */
    pixelsPerMeter() {
        return this._pixels/this._meters;
    }

}