<template>
    <div class="duo">
        <div ref="c_img" class="c_img_left">
            <v-image ref="img" :image="content.imageLeft" />
        </div>
        <div ref="c_img" class="c_img_right">
            <v-image ref="img" :image="content.imageRight" />
        </div>
    </div>
</template>
<script>
import vImage from '~/components/fragments/image'
import transform from 'dom-transform'
export default {
    name: 'Duo',
    components: { vImage },
    props: {
        content: {
            type: Object,
            default: () => {
                return {}
            }
        }
    },
    data() {
        return {
            scrollTop: 0,
            isShown: true
        }
    },
    mounted() {
        this.resize()
        this.els = [
            document.querySelector('.c_img_left'),
            document.querySelector('.c_img_right')
        ]
    },
    methods: {
        tick(scrollTop) {
            this.scrollTop = scrollTop
            if (this.scrollTop > this.start) {
                if (!this.isShown) this.show()
            }
            if (this.scrollTop < this.start) {
                if (this.isShown) this.reset()
            }

            if (this.scrollTop > this.loadHeight) {
                if (!this.isLoaded) {
                    this.isLoaded = true
                    this.$children.forEach((element) => {
                        element.load()
                    })
                }
            }
            if (!this.content.isParallax) return
            if (this.scrollTop > this.start && this.scrollTop < this.end) {
                const coef =
                    (this.scrollTop - this.start) / (this.end - this.start)
                transform(this.$refs.c_img, {
                    translate3d: [
                        0,
                        this.w > this.h
                            ? coef * this.h * 0.2
                            : coef * this.h * 0.1,
                        0
                    ]
                })
            }
        },
        resize(w, h) {
            this.w = w
            this.h = h
            this.imgProportion =
                this.$refs.c_img.clientWidth / window.innerWidth
            this.$refs.img.resize()

            const { top, height } = this.$el.getBoundingClientRect()
            this.start = this.scrollTop + top - h
            this.end = this.start + h + height
            this.loadHeight = this.start - h
        },
        show() {
            this.isShown = true
            gsap.killTweensOf(this.els)
            gsap.to(this.els, {
                scale: 1,
                opacity: 1,
                translateY: 0,
                force3D: true,
                duration: 1.5,
                ease: 'power2.out',
                onStart: () => {
                    this.els.forEach((element) => {
                        element.style.willChange = 'transform, opacity'
                    })
                },
                onComplete: () => {
                    this.els.forEach((element) => {
                        element.style.willChange = 'auto'
                    })
                }
            })
        },
        reset() {
            this.isShown = false
            gsap.killTweensOf(this.els)
            gsap.set(this.els, { translateY: '30%', scale: 1.1, opacity: 0 })
        }
    }
}
</script>
<style lang="scss">
.duo {
    display: flex;
    min-height: 100vh;
    .c_img_left,
    .c_img_right {
        position: relative;
        overflow: hidden;
        height: 100vh;
        width: 28vw;
    }
    .c_img_right {
        margin-left: 16%;
    }
    .c_img_left {
        margin-left: 16%;
    }
    @include below(medium) {
        .c_img_left,
        .c_img_right {
            height: auto;
        }
    }
}
</style>
