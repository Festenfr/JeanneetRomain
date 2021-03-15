<template>
    <div ref="top" class="top__gallery">
        <div class="enseigne">
            <h1 ref="titre">{{ data.title }}</h1>
        </div>
        <v-social />
        <v-gallery ref="gallery" :images="data.images" />
    </div>
</template>

<script>
import emitter from '~/assets/js/events/EventsEmitter'
import { mapState } from 'vuex'
import splitLines from '~/assets/js/utils/SplitLines'

import vGallery from '~/components/accueil/gallery'
import vSocial from '~/components/fragments/socials'

import getQuery from '~/assets/js/utils/data/getQuery'
import homePageQuery from '~/assets/graphql/index'
export default {
    name: 'IndexPage',
    components: {
        vSocial,
        vGallery
    },
    async asyncData({ $config: { graphqlUrl } }) {
        const data = await getQuery(graphqlUrl, homePageQuery)
        return { data: data.home }
    },
    computed: {
        ...mapState(['isLoaderAnimationDone'])
    },
    mounted() {
        this.$nextTick(() => {
            emitter.emit('PAGE:MOUNTED')
            splitLines(this.$refs.titre)
            this.stagger = [].slice.call(
                this.$refs.titre.querySelectorAll('.inner')
            )
            gsap.fromTo(
                this.stagger,
                { y: '100%' },
                {
                    y: '0%',
                    ease: 'power4.out',
                    force3D: true,
                    duration: 2,
                    delay: this.isLoaderAnimationDone ? 0.2 : 1.3,
                    stagger: {
                        amount: 0.4,
                        ease: 'power2.out'
                    }
                }
            )
            gsap.fromTo(
                this.$refs.titre,
                { y: '30%' },
                {
                    y: '0%',
                    opacity: 1,
                    ease: 'power4.out',
                    force3D: true,
                    duration: 2,
                    delay: this.isLoaderAnimationDone ? 0.2 : 1.3
                }
            )
        })
    },
    methods: {
        tick(scrollTop) {
            this.scrollTop = scrollTop
            this.$refs.gallery.tick(scrollTop)
        },
        resize(w, h, ph) {
            this.w = w
            this.h = h
            this.ph = ph
            this.$refs.gallery.resize()
        }
    }
}
</script>
<style lang="scss">
.top__gallery {
    margin: 0;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    overscroll-behavior-y: none;
    height: 100vh;
    left: 0;
    position: fixed;
    top: 0;
    width: 100vw;
    z-index: 1;
    background-color: $black;
    &::before {
        background-color: black;
        opacity: 0.15;
        content: '';
        height: 300%;
        left: -100%;
        pointer-events: none;
        position: absolute;
        top: -100%;
        width: 300%;
        will-change: transform;
        z-index: 2;
    }

    h1 {
        text-align: center;
        width: 100%;
        user-select: none;
        position: absolute;
        color: $primary;
        top: 50%;
        left: 50%;
        font-size: vw(78);
        line-height: 1.2;
        letter-spacing: vw(3);
        transform: translate(-50%, -50%);
        opacity: 0;
        z-index: 2;
        .line,
        .inner {
            display: block;
            overflow: hidden;
        }
    }
}
</style>
