<template>
    <nav class="navigation">
        <nuxt-link
            :to="{ name: 'index' }"
            class="home"
            @click.native="onLogoClicked"
            @mouseenter.native="onLogoEnter"
            ><v-logo
        /></nuxt-link>
        <nuxt-link :to="{ name: 'work' }" class="projects"
            >Projects<svg class="hover" viewBox="0 0 100 60">
                <rect
                    class="rect"
                    x="0"
                    y="0"
                    fill="none"
                    stroke="#fafafa77"
                    stroke-width="2"
                    width="100%"
                    height="100%"
                /></svg
        ></nuxt-link>
        <nuxt-link :to="{ name: 'about' }" class="about"
            >About
            <svg class="hover" viewBox="0 0 100 60">
                <rect
                    class="rect"
                    x="0"
                    y="0"
                    fill="none"
                    stroke="#fafafa77"
                    stroke-width="2"
                    width="100%"
                    height="100%"
                /></svg
        ></nuxt-link>
        <button
            v-if="$route.name === 'work' || $route.name === 'work-slug'"
            class="u_scroll"
            @click="doScroll"
        >
            Scroll
            <svg class="hover" viewBox="0 0 100 60">
                <rect
                    class="rect"
                    x="0"
                    y="0"
                    fill="none"
                    stroke="#fafafa77"
                    stroke-width="2"
                    width="100%"
                    height="100%"
                />
            </svg>
        </button>
    </nav>
</template>

<script>
import vLogo from '~/assets/svgs/logo.svg?inline'
import { mapState, mapGetters } from 'vuex'
import ScrollHelper from '~/assets/js/utils/ScrollHelper'
export default {
    name: 'Navigation',
    components: { vLogo },
    data() {
        return {
            showScroll: true,
            isAnim: false
        }
    },
    computed: {
        ...mapState(['isLoaderAnimationDone']),
        ...mapGetters(['isTouch'])
    },
    watch: {
        $route() {
            this.$nextTick(() => {
                this.$nextTick(() => {
                    const rect = [].slice.call(
                        this.$el.querySelectorAll('rect')
                    )
                    rect.forEach((element) => {
                        let length = element.getTotalLength()
                        element.style.strokeDashoffset = length
                        element.style.strokeDasharray = length
                    })
                    this.$nextTick(() => {
                        rect.forEach((element) => {
                            element.classList.add('animate')
                        })
                    })
                })
            })
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.$nextTick(() => {
                const rect = [].slice.call(this.$el.querySelectorAll('rect'))
                rect.forEach((element) => {
                    let length = element.getTotalLength()
                    element.style.strokeDashoffset = length
                    element.style.strokeDasharray = length
                })
                this.$nextTick(() => {
                    rect.forEach((element) => {
                        element.classList.add('animate')
                    })
                })
            })
        })
        document.querySelector('.about')
        this.$el.style.opacity = 1
        const stagger = [
            this.$el.querySelector('.projects'),
            this.$el.querySelector('.about'),
            this.$el.querySelector('.u_scroll')
        ]
        gsap.fromTo(
            stagger,
            { opacity: 0 },
            {
                opacity: 1,
                delay: 1.2,
                duration: 2,
                stagger: 0.6,
                ease: 'power2.out',
                clearProps: 'all'
            }
        )
    },
    methods: {
        onLogoClicked() {},
        onLogoEnter() {
            if (this.isEntered) return
            if (this.isTouch) return
            this.isEntered = true
            const svgs = [].slice.call(this.$el.querySelectorAll('.home svg'))
            gsap.to(svgs, {
                opacity: 0,
                scale: 0.5,
                force3D: true,
                ease: 'power4.out',
                duration: 0.2
            }).then(() => {
                gsap.fromTo(
                    svgs,
                    { opacity: 1, scale: 1, x: -this.w * 0.1 },
                    {
                        x: 0,
                        ease: 'power4.out',
                        force3D: true,
                        duration: 0.5
                    }
                ).then(() => {
                    this.isEntered = false
                })
            })
        },
        doScroll() {
            ScrollHelper.scrollTo(this.h)
        },
        resize(w, h, ph) {
            this.w = w
            this.h = h
            this.ph = ph
            this.top = this.ph - this.h - this.h
        },
        tick(scrollTop) {
            if (this.isAnim) return
            if (scrollTop > this.h * 0.1) {
                if (this.showScroll) {
                    this.isAnim = true

                    new Promise((resolve) => {
                        gsap.to('.u_scroll', {
                            duration: 0.5,
                            opacity: 0,
                            onComplete: resolve()
                        }).then(() => {
                            this.isAnim = false
                            this.showScroll = false
                        })
                    })
                }
            } else {
                if (!this.showScroll) {
                    this.isAnim = true
                    this.showScroll = true
                    new Promise((resolve) => {
                        gsap.to('.u_scroll', {
                            duration: 0.5,
                            opacity: 1,
                            onComplete: resolve()
                        }).then(() => {
                            this.isAnim = false
                        })
                    })
                }
            }
        }
    }
}
</script>

<style lang="scss">
.navigation {
    position: fixed;
    top: 0;
    opacity: 0;
    width: 100vw;
    font-size: vw(12);
    letter-spacing: vw(1);
    height: 100vh;
    min-height: 100vh;
    min-height: -webkit-fill-available;
    pointer-events: none;
    z-index: 5;
    @include below(medium) {
        font-size: vwM(14);
    }
    a:hover rect,
    button:hover rect,
    .nuxt-link-exact-active rect {
        stroke-dashoffset: 0 !important;
    }
    rect.animate {
        transition: stroke-dashoffset 0.7s $ease-in-out-quart;
    }
    .home {
        position: absolute;
        top: vw(40);
        left: vw(40);
        width: vw(45);
        height: vw(45);
        @include below(medium) {
            top: vwM(40);
            left: vwM(40);
            width: vwM(45);
            height: vwM(45);
        }
        svg {
            display: block;
            fill: currentColor;
        }
    }
    a {
        color: currentColor;
        pointer-events: auto;
        height: vw(45);
        @include below(medium) {
            height: vwM(45);
        }
    }
    a.about {
        color: $primary;
        right: vw(60);
        @include below(medium) {
            right: vwM(60);
        }
    }
    a.projects {
        color: $primary;
        right: vw(150);
        @include below(medium) {
            right: vwM(150);
        }
    }
    button {
        color: $primary;
        pointer-events: auto;
        height: vw(45);
        @include below(medium) {
            right: vwM(45);
        }
    }
    .u_scroll {
        bottom: vw(20);
        @include below(medium) {
            bottom: vwM(20);
        }
        right: 47vw;
        position: absolute;
        display: block;
        user-select: none;
        opacity: 1;
        .hover {
            display: block;
            position: absolute;
            height: vw(45);
            width: vw(80);
            top: vw(22.5);
            @include below(medium) {
                height: vwM(45);
                width: vwM(80);
                top: vwM(22.5);
            }
            left: 50%;
            transform: translate(-50%, -50%) scale(-1, -1);
            fill: none;
            stroke: currentColor;
        }
    }
}
a.projects,
a.about {
    top: vw(55);
    @include below(medium) {
        top: vwM(55);
    }
    position: absolute;
    font-weight: normal;
    display: block;
    user-select: none;
    .hover {
        display: block;
        position: absolute;
        width: vw(80);
        height: vw(45);
        top: vw(12);
        @include below(medium) {
            width: vwM(80);
            height: vwM(45);
            top: vwM(12);
        }
        left: 50%;
        transform: translate(-50%, -50%) scale(-1, -1);
        fill: none;
        stroke: currentColor;
    }
}
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
}
</style>
