<template>
    <picture>
        <source
            :srcset="srcs('.webp')"
            type="image/webp"
            :sizes="`${$parent.imgWidth}px`"
        />
        <source
            :srcset="srcs()"
            type="image/jpeg"
            :sizes="`${$parent.imgWidth}px`"
        />
        <img
            :src="placeholderSrc"
            :alt="image.alternativeText"
            decoding="async"
            loading="lazy"
            crossorigin="anonymous"
        />
    </picture>
</template>
<script>
export default {
    name: 'VImage',
    props: {
        image: {
            type: Object,
            default: () => {
                return {}
            }
        }
    },
    computed: {
        url() {
            return this.$config.awsUrl
        },
        placeholderSrc() {
            let format
            this.image.ext === '.webp' ? (format = '.webp') : (format = '.jpg')
            return `${this.url}thumbnail_${this.image.hash}${format}`
        }
    },
    mounted() {
        console.log('child load')
    },
    methods: {
        srcs(type) {
            let format
            this.image.ext === type ? (format = type) : (format = '.jpg')
            return `${this.url}small_${this.image.hash}${format} 500w, ${this.url}medium_${this.image.hash}${format} 750w, ${this.url}large_${this.image.hash}${format} 1280w,`
        }
    }
}
</script>
