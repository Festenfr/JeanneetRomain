<template>
    <div>about</div>
</template>
<script>
// import transform from 'dom-transform'
import emitter from '~/assets/js/events/EventsEmitter'
import { mapState } from 'vuex'
export default {
    computed: {
        ...mapState(['isLoaderAnimationDone'])
    },
    mounted() {
        this.$nextTick(() => {
            emitter.emit('PAGE:MOUNTED')
        })
    },

    methods: {
        tick(scrollTop) {
            this.scrollTop = scrollTop
        },
        resize(w, h, ph) {
            this.h = h
            this.ph = ph
        }
    }
}
</script>

<style></style>
