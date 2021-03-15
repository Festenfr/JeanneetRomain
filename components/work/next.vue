<template>
    <div ref="next" class="next">
        <div class="next_project" @click="goTo(project.titre)">
            <div class="index"></div>
            <h3>orcanta 19</h3>
            <p>Client / <strong> OHp4l8a</strong></p>
        </div>
    </div>
</template>

<script>
import Next from '~/modules/slug/next'
export default {
    data() {
        return {
            images: [
                'https://alexandrine-veneri.s3.eu-west-3.amazonaws.com/optimal.webp',
                'https://alexandrine-veneri.s3.eu-west-3.amazonaws.com/black.webp'
            ],
            scene: ''
        }
    },
    mounted() {
        this.scene = new Next(this.images, this.$config)
        this.resize()
        gsap.from('.next_project', {
            scrollTrigger: {
                trigger: '.index',
                start: 'top 100%',
                toggleActions: 'play none none reverse'
            },
            width: '5px',
            duration: 1.5
        })
    },
    methods: {
        resize(w, h) {
            this.h = h
            this.w = w
            this.scene.onWindowResize()

            const { top, height } = this.$refs.next.getBoundingClientRect()

            this.start = this.scrollTop + top - h
            this.end = this.start + height
            this.loadHeight = this.start - +h
        },
        tick(scrollTop) {
            this.scrollTop = scrollTop
            if (this.scrollTop > this.start) {
                let progress =
                    (this.scrollTop - this.start) / (this.end - this.start)
                this.scene.tick(progress)
            }
        }
    }
}
</script>

<style lang="scss">
.next {
    position: relative;
    opacity: 1;
    width: 100vw;
    height: 100vh;
    .next_project {
        left: 40%;
        top: calc(50% - 75px);
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
</style>
