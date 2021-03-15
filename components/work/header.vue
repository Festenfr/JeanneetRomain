<template>
    <div class="header"></div>
</template>

<script>
import Header from '~/modules/slug/header'
export default {
    data() {
        return {
            images: [
                'https://alexandrine-veneri.s3.eu-west-3.amazonaws.com/optimal.webp',
                'https://alexandrine-veneri.s3.eu-west-3.amazonaws.com/black.webp'
            ],
            scene: ''
        }
    },
    mounted() {
        this.scene = new Header(this.images, this.$config)
    },
    methods: {
        resize(w, h) {
            this.h = h
            this.w = w
            this.scene.onWindowResize()
        },
        tick(scrollTop) {
            this.scrollTop = scrollTop
            this.scene.tick(scrollTop)
        }
    }
}
</script>

<style lang="scss">
.header {
    position: relative;
    top: 0;
    left: 0;
    opacity: 1;
    width: 100vw;
    height: 200vh;
}
</style>
