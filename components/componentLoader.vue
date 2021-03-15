<template>
    <component
        :is="getComponent"
        ref="comp"
        :content="content"
        class="work-content"
    ></component>
</template>

<script>
import vSinglePaysage from '~/components/work/singlePaysage'
import vSinglePortrait from '~/components/work/singlePortrait'
import vDuo from '~/components/work/duo.vue'
export default {
    name: 'ComponentLoader',
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
            links: {
                SinglePaysage: vSinglePaysage,
                SinglePortrait: vSinglePortrait,
                Duo: vDuo
            }
        }
    },
    computed: {
        getComponent() {
            let link = this.links[this.content.type]
            if (!link) {
                console.warn(`Can't find  ${this.content.type}`)
                return false
            }
            const comp = link
            return comp
        }
    },
    mounted() {},
    methods: {
        tick(scrollTop) {
            this.$refs.comp.tick(scrollTop)
        },
        resize(w, h) {
            this.$refs.comp.resize(w, h)
        }
    }
}
</script>
<style lang="scss">
.work-content {
    margin-bottom: 10vw;
    @include below(medium) {
        margin-bottom: 10vw;
    }
}
</style>
