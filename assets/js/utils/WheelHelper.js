import normalizeWheel from 'normalize-wheel'
import { clamp } from '~/assets/js/math'
class WheelHelper {
    constructor() {
        this.TotalDeltaY = 0
        this.ease = 0
        this.delta = 0
        this.deltaEase = 0
        this._onWheel = this.onWheel.bind(this)
        if (process.browser)
            window.addEventListener('wheel', this._onWheel, {
                passive: true
            })
    }

    onWheel(e) {
        const normalized = normalizeWheel(e)
        this.TotalDeltaY += normalized.pixelY
        this.delta = clamp(normalized.pixelY, -100, 100)
    }
    tick() {
        let delta = Math.abs(this.delta)
        delta--
        if (delta < 0) delta = 0
        this.delta = Math.sign(this.delta) * delta
        const dX = this.delta - this.deltaEase

        this.deltaEase += dX / 10

        this.ease = this.lerp(this.ease, this.TotalDeltaY, 0.04)
    }
    lerp(x, y, r) {
        return x + (y - x) * r
    }
}

export default new WheelHelper()
