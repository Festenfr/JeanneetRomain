<template>
    <div class="loader">
        <v-carre />
        <v-carre class="carre" />
        <v-carre class="carre" />
        <v-carre class="carre" />
        <v-carre class="carre" />
    </div>
</template>

<script>
import vCarre from '~/assets/svgs/carre.svg?inline'
import { mapActions } from 'vuex'
export default {
    name: 'Loader',
    components: { vCarre },
    mounted() {
        this.svgs = [].slice.call(this.$el.querySelectorAll('svg'))
        this.carres = [].slice.call(this.$el.querySelectorAll('.carre'))
        this.$nextTick(() => {
            this.carreAnimation()
        })
    },
    methods: {
        ...mapActions(['set']),
        carreAnimation() {
            this.carres.forEach((el, i) => {
                window.gsap
                    .fromTo(
                        el,
                        { scaleX: 0, scaleY: 0 },
                        {
                            scaleX: 1,
                            scaleY: 1,
                            duration: 0.8,
                            delay: 0.2 * i,
                            ease: 'power4.in'
                        }
                    )
                    .then(() => {
                        this.svgs[i].style.display = 'none'
                    })
            })
            gsap.to(this.$el, {
                autoAlpha: 0,
                duration: 0.1,
                ease: 'power3.out',
                delay: 1.4
            }).then(() => {
                this.set({ property: 'isLoaderAnimationDone', value: true })
            })
        }
    }
}
</script>

<style lang="scss">
.loader {
    bottom: 0;
    left: 0;
    position: fixed;
    right: 0;
    top: 0;
    transform-origin: 50% 0%;
    z-index: 5;
    svg:nth-child(1) {
        fill: $primary;
    }
    svg:nth-child(2) {
        fill: $secondary;
    }
    svg:nth-child(3) {
        fill: $primary;
    }
    svg:nth-child(4) {
        fill: $secondary;
    }
    svg:nth-child(5) {
        fill: $primary;
    }

    svg {
        position: absolute;
        transform: none;
        fill: currentColor;
        top: vw(39.75);
        left: vw(39.75);
        width: vw(45.5);
        height: vw(45.5);
        display: block;
        @include below(medium) {
            top: vwM(39.75);
            left: vwM(39.75);
            width: vwM(45.5);
            height: vwM(45.5);
        }
    }
}
</style>
