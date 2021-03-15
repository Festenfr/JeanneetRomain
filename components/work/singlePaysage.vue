<template>
    <div class="single-paysage">
        <div ref="c_img_paysage" class="c_img_paysage">
            <v-image ref="img" :image="content.image" />
        </div>
    </div>
</template>
<script>
import vImage from '~/components/fragments/image'
import randomInt from '../../assets/js/math/randomInt'
export default {
    name: 'SinglePaysage',
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
            isShown: true,
            isLoaded: false
        }
    },
    mounted() {
        this.resize()
        this.imageContainer = document.querySelectorAll('.c_img_paysage')
        this.imageContainer.forEach((element) => {
            let randLeft = randomInt(15, 30)
            element.style.left = randLeft + 'vw'
        })
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
        },
        resize(w, h) {
            this.imgProportion =
                this.$refs.c_img_paysage.clientWidth / window.innerWidth
            this.$refs.img.resize()

            const { top, height } = this.$el.getBoundingClientRect()
            this.start = this.scrollTop + top - h
            this.end = this.start + h + height
            this.loadHeight = this.start - h
        },
        show() {
            this.isShown = true
            gsap.killTweensOf(this.$el)
            gsap.to(this.$el, {
                scale: 1,
                opacity: 1,
                translateY: 0,
                force3D: true,
                duration: 1.5,
                ease: 'power2.out',
                onStart: () => {
                    this.$el.style.willChange = 'transform, opacity'
                },
                onComplete: () => {
                    this.$el.style.willChange = 'auto'
                }
            })
        },
        reset() {
            this.isShown = false
            gsap.killTweensOf(this.$el)
            gsap.set(this.$el, { translateY: '10%', scale: 1.2, opacity: 0 })
        }
    }
}
</script>
<style lang="scss">
.single-paysage {
    overflow: hidden;
    width: 100vw;
    min-height: 100vh;
    .c_img_paysage {
        position: relative;
        width: 50vw;
    }
    @include below(medium) {
        img {
            object-fit: cover;
            height: 50vh;
        }
    }
}
</style>
