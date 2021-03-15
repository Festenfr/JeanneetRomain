import Emitter from '~/assets/js/events/EventsEmitter'
import { clamp } from '~/assets/js/math'
class ScrollHelper {
    constructor() {
        this.ease = 0
        this.easeSlow = 0
        this.scrollTop = 0
        this.delta = 0
        this.deltaEase = 0
        this._preventDefault = this.preventDefault.bind(this)
        this._onScroll = this.onScroll.bind(this)
        this.tempScroll = 0

        if (process.browser) {
            this.doc = document.documentElement
            window.addEventListener('scroll', this._onScroll, { passive: true })
        }
        Emitter.on('WINDOW:DOSCROLL', this.scrollTo.bind(this))
    }

    onScroll() {
        if (this.isForceScrolling) {
            this.isForceScrolling = false
        } else {
            const scroll =
                (window.pageYOffset || this.doc.scrollTop) -
                (this.doc.clientTop || 0)
            if (scroll !== this.scrollTop) {
                this.scrollTop =
                    (window.pageYOffset || this.doc.scrollTop) -
                    (this.doc.clientTop || 0)
                this.scrollTop = Math.max(this.scrollTop, 0)
            }
        }
        if (this.ease > this.scrollTop) {
            this.eachScroll = -100
        } else {
            this.eachScroll = 100
        }
        this.delta = clamp(this.eachScroll, -100, 100)
    }
    scrollTo(y) {
        //console.log('SCROLLHELPER scrollTo', y)
        window.scrollTo(0, y)
        this.scrollTop = y
    }

    goTo(y) {
        //console.log('SCROLLHELPER goTo', y)
        this.scrollTo(0, y)
        this.scrollTop = y
        this.ease = y
        this.easeSlow = y
        this.isForceScrolling = true
    }
    changePage(pageName) {
        this.pageName = pageName
    }
    resetScroll(y) {
        //console.log('SCROLLHELPER resetScroll', y)
        this.tick()
        if (y > this.scrollTop) {
            this.ease = this.ease + y
            this.easeSlow = this.easeSlow + y
        } else {
            this.ease = this.ease - this.scrollTop
            this.easeSlow = this.easeSlow - this.scrollTop
        }

        this.scrollTop = y
        this.scrollTo(y)
        this.tick()
    }

    tick() {
        this.tempScroll = this.scrollTop
        this.ease = this.lerp(this.ease, this.scrollTop, 0.07)
        this.easeSlow = Math.round(
            this.lerp(this.easeSlow, this.scrollTop, 0.06)
        )
        let delta = Math.abs(this.delta)
        delta--
        if (delta < 0) delta = 0
        this.delta = Math.sign(this.delta) * delta

        const dX = this.delta - this.deltaEase

        this.deltaEase += dX / 10
    }
    lerp(x, y, r) {
        return x + (y - x) * r
    }

    preventDefault(e) {
        e = e || window.event
        if (e.preventDefault) e.preventDefault()
        e.returnValue = false
    }

    disableScroll() {
        //if(window.addEventListener) window.addEventListener('DOMMouseScroll', this._preventDefault, {passive: true})
        //window.onwheel = this._preventDefault; // modern standard
        //window.onmousewheel = document.onmousewheel = this._preventDefault; // older browsers, IE
    }

    enableScroll() {
        //if(window.removeEventListener) window.removeEventListener('DOMMouseScroll', this._preventDefault, {passive: true})
        //window.onmousewheel = document.onmousewheel = null;
        ////window.onwheel = null;
        //window.ontouchmove = null;
        //document.onkeydown = null;
    }
}

export default new ScrollHelper()
