class Scale {

    /**
     * 
     * @param {number} meters 
     * @param {number} pixels 
     */
    constructor(meters = 1000, pixels = 1) {
        this.meters = meters;
        this.pixels = pixels;
    }

    metersPerPixel() {
        return this.meters/this.pixels;
    }

    pixelsPerMeter() {
        return this.pixels/this.meters;
    }

}