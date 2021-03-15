<template>
    <main :class="[{ 'no-touch': !isTouch }, { 'is-touch': isTouch }]">
        <client-only>
            <v-scroller v-if="!isTouch" ref="scroller" />
        </client-only>
        <client-only>
            <v-transition ref="transition"></v-transition>
        </client-only>
        <client-only>
            <v-slider ref="slider"></v-slider>
        </client-only>
        <v-navigation ref="navigation"></v-navigation>
        <v-loader v-if="!isLoaderAnimationDone" />
        <div ref="scroll" class="scroll">
            <nuxt ref="page" :key="$route.name" />
        </div>
    </main>
</template>
<script>
import vLoader from '~/components/common/loader.vue'
import vNavigation from '~/components/common/navigation.vue'
import vTransition from '~/components/common/transition.vue'
import vScroller from '~/components/common/scroller.vue'
import vSlider from '../components/common/slider'

import { mapGetters, mapState } from 'vuex'
import emitter from '~/assets/js/events/EventsEmitter'
import transform from 'dom-transform'

import ScrollHelper from '../assets/js/utils/ScrollHelper'
import ResizeHelper from '../assets/js/utils/ResizeHelper'
import WheelHelper from '~/assets/js/utils/WheelHelper'
import MouseHelper from '../assets/js/utils/MouseHelper'
export default {
    components: {
        vLoader,
        vNavigation,
        vTransition,
        vScroller,
        vSlider
    },
    data() {
        return {
            scrollTop: 0,
            isScrolling: false
        }
    },
    computed: {
        ...mapState(['isLoaderAnimationDone']),
        ...mapGetters(['isTouch'])
    },

    mounted() {
        window.gsap.ticker.add(this.tick.bind(this))
        this.setRouterHook()
        emitter.on('GLOBAL:RESIZE', this.onResize.bind(this))
        emitter.on('PAGE:MOUNTED', this.onMounted.bind(this))
        if (!this.isTouch) {
            document.querySelector('html').classList.add('no-touch')
        }
    },
    methods: {
        onResize() {
            this.w = ResizeHelper.width()
            this.h = ResizeHelper.height()
            const pageHeight = this.$refs.scroll.clientHeight
            if (!this.isTouch) {
                document.body.style.height = pageHeight + 'px'
            }
            if (this.$refs.page && this.$refs.page.$children[0])
                this.$refs.page.$children[0].resize &&
                    this.$refs.page.$children[0].resize(
                        this.w,
                        this.h,
                        pageHeight
                    )
            this.$refs.transition.resize(this.w, this.h)
            this.$refs.navigation.resize(this.w, this.h, pageHeight)
            this.$refs.slider.resize(this.w, this.h, pageHeight)
            if (this.$refs.scroller)
                this.$refs.scroller.resize(this.w, this.h, pageHeight)
        },
        tick() {
            if (!this.w) return
            //Set helpers for mouse, scroll, wheel refresh at 60fps
            WheelHelper.tick()
            ScrollHelper.tick()
            if (!this.isTouch) MouseHelper.tick()

            //Smoothscroll
            const scrollTop = this.isTouch
                ? ScrollHelper.scrollTop
                : Math.round(ScrollHelper.ease)
            if (!this.isTouch) {
                transform(this.$refs.scroll, {
                    translate3d: [0, -scrollTop, 0]
                })
            }

            //scroll?
            if (Math.abs(this.scrollTop - scrollTop) >= 1) {
                this.isScrolling = true
            } else {
                this.isScrolling = false
            }
            this.$refs.slider.tick(scrollTop)
            this.$refs.navigation.tick(scrollTop)
            //set scroll bar
            this.scrollTop = scrollTop
            if (this.$refs.scroller) this.$refs.scroller.tick(scrollTop)
            //wait for transition
            if (this.$refs.transition) {
                this.$refs.transition.tick()
            }
            //pass tick to mounted page
            if (this.$refs.page && this.$refs.page.$children[0]) {
                this.$refs.page.$children[0].tick(scrollTop)
            }
        },
        setRouterHook() {
            this.$router.beforeEach((to, from, next) => {
                let time = 500
                if (from.name === 'work' && to.name === 'work-slug') {
                    time = 1200
                    setTimeout(() => {
                        this.$refs.slider.doRouteTransition(to.params.slug)
                    }, 200)
                } else {
                    this.$refs.transition.doTransition(to.name, from.name)
                }
                setTimeout(() => {
                    next()
                }, time)
            })
        },
        onMounted() {
            ScrollHelper.goTo(0)
            if ('requestIdleCallback' in window) {
                requestIdleCallback(this.onMountedReady.bind(this), {
                    timeout: 500
                })
            } else {
                setTimeout(() => {
                    this.onMountedReady()
                }, 100)
            }
        },
        onMountedReady() {
            this.onResize()
            //mémorise une fonction qui sera appellée lorsque le navigateur n'aura plus aucune autre tâche en cours sauf si dépasse le timeout
            if ('requestIdleCallback' in window) {
                requestIdleCallback(
                    () => {
                        this.$refs.transition.hideTransition()
                    },
                    {
                        timeout: 500
                    }
                )
            } else {
                setTimeout(() => {
                    this.$refs.transition.hideTransition()
                }, 100)
            }
            setTimeout(() => {
                this.onResize()
            }, 3000)
        }
    }
}
</script>

<style lang="scss">
.isScrolling * {
    user-select: none;
}

.no-touch.isScrolling .scroll {
    will-change: transform;
}
* {
    text-rendering: optimizeSpeed;
}
main {
    background-color: black;
    position: relative;
    overflow: hidden;
    width: 100vw;
    min-height: 100vh;
    &.no-touch {
        left: 0;
        position: fixed;
        right: 0;
        top: 0;
    }
    .scroll {
        z-index: 2;
        position: relative;
    }
}
</style>
