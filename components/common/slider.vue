<template>
    <div id="slider"></div>
</template>

<script>
import emitter from '~/assets/js/events/EventsEmitter'
import { mapState } from 'vuex'
import Slider from '~/modules/work/slider'
export default {
    data() {
        return {
            images: [
                'https://alexandrine-veneri.s3.eu-west-3.amazonaws.com/optimal.jpg',
                'https://alexandrine-veneri.s3.eu-west-3.amazonaws.com/lazaros_mergoupis_pns_M9tderew_unsplash.jpg'
            ],
            scene: ''
        }
    },
    computed: {
        ...mapState(['isLoaderAnimationDone'])
    },
    mounted() {
        this.scene = new Slider(this.images, this.$config)
        emitter.on('WORK:ENTER', this.onWorkEnter.bind(this))
        emitter.on('WORK:LEAVE', this.onWorkLeave.bind(this))
        setTimeout(() => {
            if (this.$route.name === 'work') this.onWorkEnter()
        }, 1200)
    },
    methods: {
        tick(scrollTop) {
            if (this.$route.name === 'about') return
            if (this.$route.name === 'index') return
            this.scrollTop = scrollTop
            this.scene.tick(scrollTop)
            this.scene.onMouseMove()
        },
        resize(w, h, ph) {
            this.h = h
            this.ph = ph
            this.scene.onWindowResize()
        },
        doRouteTransition() {
            this.scene.doRouteTransition()
        },
        onWorkEnter() {
            this.scene.onWorkEnter()
            gsap.to('#slider', {
                opacity: 1,
                display: 'block',
                duration: 0.1
            })
        },
        onWorkLeave() {
            this.scene.onWorkLeave()
        }
    }
}
</script>
<style lang="scss">
#slider {
    position: fixed;
    top: 0;
    left: 0;
    opacity: 0;
    width: 100vw;
    height: 100vh;
    z-index: 2;
}
</style>
