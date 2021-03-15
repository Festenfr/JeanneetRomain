<template>
    <div class="gallery">
        <div
            v-for="(image, i) in images"
            :key="`image-${i}`"
            ref="gallery__figure"
            class="gallery__figure"
        >
            <component
                :is="componentId"
                ref="img"
                class="gallery__image"
                :image="image"
            ></component>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import vImage from '../fragments/image'
import Gallery from '~/modules/accueil/gallery'
export default {
    name: 'VGallery',
    components: {
        vImage
    },
    props: {
        images: {
            type: Array,
            default: () => {
                return []
            }
        }
    },
    data() {
        return {
            isLoaded: false,
            scrollTop: 0,
            imgWidth: 0
        }
    },
    computed: {
        ...mapState(['isLoaderAnimationDone']),
        componentId() {
            if (!this.isLoaded) return
            return vImage
        }
    },
    mounted() {
        this.imgWidth = this.$refs.gallery__figure[0].clientWidth
        if (!this.isLoaded) {
            this.isLoaded = true
            console.log('parent load')
        }
        this.$nextTick(this.onImageMounted)
    },
    methods: {
        tick(scrollTop) {
            this.scrollTop = scrollTop
        },
        resize() {
            this.imgWidth = this.$refs.gallery__figure[0].clientWidth
        },
        onImageMounted() {
            console.log('next tick')
            new Gallery(
                document.querySelector('.top__gallery'),
                this.isLoaderAnimationDone,
                this.$config
            )
        }
    }
}
</script>

<style lang="scss">
.gallery {
    @include above(medium) {
        height: vw(2760);
        position: relative;
        visibility: hidden;
    }
    @include below(medium) {
        height: 400vw;
        position: relative;
        visibility: hidden;
    }

    .gallery__figure {
        position: absolute;
        .gallery__image {
            height: 100%;
            left: 0;
            object-fit: cover;
            position: absolute;
            top: 0;
            width: 100%;
        }
        @include above(medium) {
            &:nth-child(1) {
                height: vw(690);
                width: vw(460);
            }
            &:nth-child(2) {
                height: vw(690);
                width: vw(460);
                left: vw(460);
                top: vw(200);
            }

            &:nth-child(3) {
                height: vw(690);
                width: vw(460);
                right: vw(0);
                top: vw(0);
            }

            &:nth-child(4) {
                height: vw(690);
                width: vw(460);
                left: vw(0);
                top: vw(690);
            }

            &:nth-child(5) {
                height: vw(690);
                width: vw(460);
                left: vw(460);
                top: vw(890);
            }

            &:nth-child(6) {
                height: vw(690);
                width: vw(460);
                right: vw(0);
                top: vw(690);
            }

            &:nth-child(7) {
                height: vw(690);
                width: vw(460);
                left: vw(0);
                top: vw(1380);
            }

            &:nth-child(8) {
                height: vw(690);
                width: vw(460);
                left: vw(460);
                top: vw(1580);
            }

            &:nth-child(9) {
                height: vw(690);
                width: vw(460);
                right: vw(0);
                top: vw(1380);
            }

            &:nth-child(10) {
                height: vw(690);
                width: vw(460);
                left: vw(0);
                top: vw(2070);
            }

            &:nth-child(11) {
                height: vw(690);
                width: vw(460);
                left: vw(460);
                top: vw(2270);
            }

            &:nth-child(12) {
                height: vw(690);
                width: vw(460);
                right: vw(0);
                top: vw(2070);
            }
        }
        @include below(medium) {
            &:nth-child(1) {
                height: 66.666vw;
                width: 50vw;
            }

            &:nth-child(2) {
                height: 66.666vw;
                width: 50vw;
                right: 0;
            }

            &:nth-child(3) {
                height: 66.666vw;
                width: 50vw;
                top: 66.666vw;
            }

            &:nth-child(4) {
                height: 66.666vw;
                width: 50vw;
                right: 0;
                top: 66.666vw;
            }

            &:nth-child(5) {
                height: 66.666vw;
                width: 50vw;
                top: 133.333vw;
            }

            &:nth-child(6) {
                height: 66.666vw;
                width: 50vw;
                right: 0;
                top: 133.333vw;
            }

            &:nth-child(7) {
                height: 66.666vw;
                width: 50vw;
                top: 200vw;
            }

            &:nth-child(8) {
                height: 66.666vw;
                width: 50vw;
                right: 0;
                top: 200vw;
            }

            &:nth-child(9) {
                height: 66.666vw;
                width: 50vw;
                top: 266.666vw;
            }

            &:nth-child(10) {
                height: 66.666vw;
                width: 50vw;
                right: 0;
                top: 266.666vw;
            }

            &:nth-child(11) {
                height: 66.666vw;
                width: 50vw;
                top: 333.333vw;
            }
            &:nth-child(12) {
                height: 66.666vw;
                width: 50vw;
                right: 0;
                top: 333.333vw;
            }
        }
    }
}
canvas {
    position: fixed;
    width: 100%;
    left: 0;
    top: 0;
    height: 100%;
}
</style>
