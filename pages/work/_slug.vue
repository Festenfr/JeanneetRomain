<template>
    <div class="work">
        <div class="work-container">
            <v-header ref="header" />
            <v-article ref="article" />
            <v-component-loader
                v-for="(content, i) in work.contents"
                ref="contents"
                :key="`content-${i}`"
                :content="content"
            ></v-component-loader>
        </div>
        <v-next ref="next" />
        <v-social />
    </div>
</template>

<script>
import emitter from '~/assets/js/events/EventsEmitter'
import { mapState } from 'vuex'
import vHeader from '~/components/work/header.vue'
import vComponentLoader from '~/components/componentLoader.vue'
import vNext from '~/components/work/next.vue'
import vArticle from '~/components/work/article.vue'
import vSocial from '~/components/fragments/socials'

export default {
    components: { vHeader, vComponentLoader, vNext, vArticle, vSocial },
    data() {
        return {
            work: {
                contents: [
                    {
                        isParallax: true,
                        type: 'SinglePaysage',
                        image: {
                            url:
                                'https://alexandrine-veneri.s3.eu-west-3.amazonaws.com/optimal.webp',
                            alt: 'dqazdqzd'
                        }
                    },

                    {
                        isParallax: true,
                        type: 'Duo',
                        imageLeft: {
                            url:
                                'https://alexandrine-veneri.s3.eu-west-3.amazonaws.com/varun_gaba_J8o_G_Ouw_Ta2_I_unsplash.jpg',
                            alt: 'dqazdqzd'
                        },
                        imageRight: {
                            url:
                                'https://alexandrine-veneri.s3.eu-west-3.amazonaws.com/varun_gaba_J8o_G_Ouw_Ta2_I_unsplash.jpg',
                            alt: 'dqazdqzd'
                        }
                    },
                    {
                        isParallax: true,
                        type: 'SinglePortrait',
                        image: {
                            url:
                                'https://alexandrine-veneri.s3.eu-west-3.amazonaws.com/varun_gaba_J8o_G_Ouw_Ta2_I_unsplash.jpg',
                            alt: 'dqazdqzd'
                        }
                    }
                ]
            }
        }
    },
    computed: {
        ...mapState(['isLoaderAnimationDone'])
    },
    mounted() {
        this.$nextTick(() => {
            emitter.emit('PAGE:MOUNTED')
            this.els = [
                this.$refs.header,
                ...this.$refs.contents,
                this.$refs.next,
                this.$refs.article
            ]
            this.resize()
        })
    },
    methods: {
        tick(scrollTop) {
            this.scrollTop = scrollTop
            this.els.forEach((element) => {
                element.tick(scrollTop)
            })
        },
        resize(w, h, ph) {
            console.log(ph)
            this.h = h
            this.ph = ph
            this.els.forEach((element) => {
                element.resize(w, h, ph)
            })
        }
    }
}
</script>

<style lang="scss">
.work-container {
    position: relative;
}
</style>
