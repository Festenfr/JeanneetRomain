<template>
    <div ref="titre__slider" class="scroll__slider">
        <div
            v-for="project in projects"
            :key="project._id"
            ref="titre"
            class="container_project"
        >
            <div class="info_project" @click="goTo(project.titre)">
                <div class="index"></div>
                <h3>
                    {{ project.titre }}
                </h3>
                <p>Client / <strong> OHp4l8a</strong></p>
            </div>
        </div>
        <v-social />
    </div>
</template>

<script>
import emitter from '~/assets/js/events/EventsEmitter'
import { mapState } from 'vuex'
import randomInt from '../../assets/js/math/randomInt'
import transform from 'dom-transform'
import { TimelineLite } from 'gsap'
import vSocial from '~/components/fragments/socials'
export default {
    components: {
        vSocial
    },
    data() {
        return {
            projects: [
                { titre: '97 felt like a good year' },
                {
                    titre: 'orcanta ss19'
                },
                { titre: 'a short garden story a short garden story' },
                { titre: 'haven' },
                { titre: 'livera fw20' },
                { titre: 'homesick' },
                { titre: 'quarantine' },
                { titre: 'livera ss20' },
                { titre: 'porcira ss20' },
                { titre: 'orcanta ss2' }
            ],
            currentIndex: 0,
            projectLength: 0,
            previousEl: '',
            infoElements: ''
        }
    },
    computed: {
        ...mapState(['isLoaderAnimationDone'])
    },
    mounted() {
        this.$nextTick(() => {
            emitter.emit('PAGE:MOUNTED')
            emitter.emit('WORK:ENTER')
            this.projectLength = this.$refs.titre.length
            this.infoElements = document.querySelectorAll('.info_project')
            this.previousEl = this.infoElements[0]
            this.setStyleBanner()
            this.listenBanner()
        })
    },

    beforeDestroy() {
        emitter.emit('WORK:LEAVE')
    },
    methods: {
        tick(scrollTop) {
            this.scrollTop = scrollTop
        },
        listenBanner() {
            this.infoElements.forEach((el, i) => {
                el.addEventListener(
                    'mouseenter',
                    () => {
                        this.onMouseEnter(i, el)
                    },
                    false
                )
            })
        },
        setStyleBanner() {
            this.infoElements.forEach((el, i) => {
                let randLeft
                if (i % 2) {
                    randLeft = randomInt(5, 15)
                } else {
                    randLeft = randomInt(10, 20)
                }
                let randTop = randomInt(10, 40)
                el.style.top = randTop + 'vh'
                el.style.left = randLeft + 'vw'
                transform(el.children[0], {
                    scale3d: [0.002, 1, 1]
                })
                let tl = new TimelineLite()
                tl.set(el, {
                    delay: this.isLoaderAnimationDone ? 0.8 : 1.4,
                    visibility: 'visible'
                })
                tl.play().then(() => {
                    gsap.from(el, {
                        scrollTrigger: {
                            trigger: el.children[0],
                            start: 'top 100%',
                            toggleActions: 'play none none reverse'
                        },
                        width: '5px',
                        duration: 1.5
                    })
                })
            })
            document.querySelectorAll('.container_project')[0].style.marginTop =
                10 + 'vh'
            document.querySelectorAll('.container_project')[1].style.marginTop =
                10 + 'vh'
            if (this.projectLength % 2) {
                document.querySelectorAll('.container_project')[
                    this.projectLength - 1
                ].style.marginBottom = 20 + 'vh'
            } else {
                document.querySelectorAll('.container_project')[
                    this.projectLength - 1
                ].style.marginBottom = 20 + 'vh'
                document.querySelectorAll('.container_project')[
                    this.projectLength - 2
                ].style.marginBottom = 20 + 'vh'
            }

            gsap.to(this.infoElements[0].children[0], {
                duration: 0.5,
                scaleX: 1,
                ease: 'power3.out'
            })
            gsap.to(this.infoElements[0].children[1], {
                duration: 0.5,
                color: '#02735e',
                ease: 'power3.out'
            })
            gsap.to(this.infoElements[0].children[2], {
                duration: 0.5,
                color: '#02735e',
                ease: 'power3.out'
            })
        },
        goTo(titre) {
            this.infoElements.forEach((el) => {
                gsap.to(el, {
                    duration: 0.6,
                    scaleX: 0,
                    width: 0,
                    transformOrigin: 'left center',
                    ease: 'power3.out'
                })
            })
            gsap.fromTo(
                this.staggerLink,
                { y: '200%', opacity: 1 },
                {
                    y: '0%',
                    opacity: 0,
                    ease: 'power4.out',
                    force3D: true,
                    duration: 0.8,
                    stagger: 0.2
                }
            )
            this.$router.push(`/work/${titre.split(' ').join('-')}`)
        },
        onMouseEnter(i, el) {
            emitter.emit('INDEX:ENTER', i, el)
            if (this.previousEl === el) return
            gsap.to(el.children[0], {
                duration: 0.5,
                scaleX: 1,
                ease: 'power3.out'
            })
            gsap.to(el.children[1], {
                duration: 0.5,
                color: '#02735e',
                ease: 'power3.out'
            })
            gsap.to(el.children[2], {
                duration: 0.5,
                color: '#02735e',
                ease: 'power3.out'
            })
            gsap.to(this.previousEl.children[0], {
                duration: 0.5,
                scaleX: 0.002,
                ease: 'power3.in'
            })
            gsap.to(this.previousEl.children[1], {
                duration: 0.5,
                color: '#fafafa',
                ease: 'power3.in'
            })
            gsap.to(this.previousEl.children[2], {
                duration: 0.5,
                color: '#fafafa',
                ease: 'power3.in'
            })
            this.previousEl = el
        },
        resize(w, h, ph) {
            this.h = h
            this.ph = ph
            this.infoElements.forEach((el) => {
                el.style.width = '20vw'
            })
        }
    }
}
</script>

<style lang="scss">
.scroll__slider {
    margin: 0;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    overscroll-behavior-y: none;
    left: 0;
    position: relative;
    display: flex;
    flex-wrap: wrap;
    width: 100vw;
    .container_project {
        width: 50vw;
        position: relative;
        display: flex;
        height: 50vh;
        color: $white;
        .info_project {
            visibility: hidden;
            position: absolute;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: vw(90);
            width: 20vw;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            border-right: 1px solid rgba(255, 255, 255, 0.1);
            cursor: pointer;
            overflow: hidden;
            .index {
                position: absolute;
                transform-origin: left center;
                height: vw(90);
                width: 20vw;
                left: 0;
                background-color: $primary;
                opacity: 1;
            }
            h3 {
                margin: vw(16);
                line-height: vw(20);
                display: flex;
                align-items: center;
                justify-content: flex-start;
                flex-wrap: wrap;
                width: vw(250);
                font-size: vw(17);
                position: relative;
            }
            p {
                line-height: vw(11);
                display: flex;
                justify-content: flex-start;
                flex-wrap: wrap;
                width: vw(250);
                font-size: vw(9);
                position: relative;
                strong {
                    margin-left: vw(3);
                }
            }
        }
    }
}
</style>
