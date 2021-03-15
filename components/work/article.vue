<template>
    <article ref="article">
        <p ref="text" class="text">
            Le Lorem Ipsum est simplement du faux texte employé dans la
            composition et la mise en page avant impression. Le Lorem Ipsum est
            le faux texte standard de l'imprimerie depuis les années 1500, quand
            un imprimeur anonyme assembla ensemble des morceaux de texte pour
            réaliser un livre spécimen de polices de texte.
        </p>
    </article>
</template>

<script>
import splitLines from '~/assets/js/utils/SplitLines'

export default {
    mounted() {
        splitLines(this.$refs.text)
        this.stagger = [].slice.call(this.$refs.text.querySelectorAll('.inner'))
        gsap.to(this.stagger, {
            scrollTrigger: {
                trigger: '.text',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            y: '0%',
            ease: 'power4.out',
            force3D: true,
            duration: 2,
            stagger: {
                amount: 0.6,
                ease: 'power2.out'
            }
        })
    },
    methods: {
        resize(w, h) {
            this.h = h
            this.w = w
        },
        tick(scrollTop) {
            this.scrollTop = scrollTop
        }
    }
}
</script>

<style lang="scss">
article {
    position: absolute;
    top: 100vh;
    width: 100vw;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    .text {
        width: 50vw;
        color: white;
        .line,
        .inner {
            transform: translateY(100%);
            display: block;
            overflow: hidden;
        }
    }
}
</style>
