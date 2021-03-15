<template>
    <canvas class="transition" :class="{ isTransition }"></canvas>
</template>
<script>
import { TimelineLite } from 'gsap'
export default {
    name: 'Name',
    data() {
        return {
            transition: 0,
            isTransition: false
        }
    },
    mounted() {
        this.ctx = this.$el.getContext('2d')
        this.fakeCanvas = document.createElement('canvas')
        this.fakeCtx = this.fakeCanvas.getContext('2d')
    },
    methods: {
        resize(w, h) {
            this.w = w
            this.h = h
            this.fakeCanvas.width = this.$el.width = w
            this.fakeCanvas.height = this.$el.height = h
        },
        tick() {
            if (!this.isTransition) return
            this.draw()
        },
        getColor() {
            switch (this.routeName) {
                case 'index':
                    return '#000000'
                case 'about':
                    return '#000000'
                case 'work':
                    return '#000000'
            }
        },
        draw() {
            const transition = -0.5 + this.transition * 2
            const top = transition * this.h
            const h = this.h - top
            this.ctx.clearRect(0, 0, this.w, this.h)
            this.fakeCtx.fillStyle = this.getColor()

            this.fakeCtx.clearRect(0, 0, this.w, this.h)
            this.fakeCtx.beginPath()
            this.fakeCtx.rect(0, h, this.w, top)
            this.fakeCtx.moveTo(0, h)
            this.fakeCtx.quadraticCurveTo(
                this.w / 2,
                h -
                    (this.h / 2) *
                        Math.cos(Math.PI * transition) *
                        (0.5 - transition),
                this.w,
                h
            )
            this.fakeCtx.fill()
            this.ctx.drawImage(this.fakeCanvas, 0, 0, this.w, this.h)
        },
        doTransition(routeName, fromName) {
            this.fromName = fromName
            this.routeName = routeName
            this.isTransition = true
            gsap.killTweensOf(this)
            gsap.killTweensOf(this.$el)
            this.$el.style.opacity = 1
            this.transition = 0
            var tl = new TimelineLite()
            return tl.to(this, {
                transition: 1,
                duration: 1,
                ease: 'power2.out'
            })
        },
        hideTransition() {
            if (!this.isTransition) return
            setTimeout(() => {
                this.isTransition = false
            }, 500)

            gsap.to(this.$el, {
                opacity: 0,
                duration: 1,
                ease: 'power2.out'
            }).then(() => {
                gsap.set(this, {
                    transition: 0
                })
            })
        }
    }
}
</script>
<style lang="scss">
.transition {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    pointer-events: none;

    height: 100vh;
    min-height: 100vh;
    min-height: -webkit-fill-available;
    opacity: 0;
    &.isTransition {
        pointer-events: auto;
    }
}
</style>
