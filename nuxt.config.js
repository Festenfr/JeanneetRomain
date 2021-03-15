export default {
    publicRuntimeConfig: {
        strapiBaseUrl: process.env.API_URL || 'http://localhost:1337',
        graphqlUrl: process.env.GRAPHQL_URL || 'http://localhost:1337/graphql',
        awsUrl:
            process.env.AWS_URL ||
            'https://jeanneetromainlocal.s3.eu-west-3.amazonaws.com/'
    },
    // server: {
    //     port: 8000, // default: 3000
    //     host: '0.0.0.0' // default: localhost
    // }, // other configs
    head: {
        title: 'nuxt-starter',
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content:
                    'width=device-width, initial-scale=1, viewport-fit=cover'
            }
        ],
        link: [
            {
                rel: 'preconnect',
                href:
                    process.env.AWS_URL ||
                    'https://jeanneetromainlocal.s3.eu-west-3.amazonaws.com/'
            }
        ]
    },
    css: [{ src: '~/assets/scss/main.scss', lang: 'scss' }],
    plugins: ['~/plugins/vuex-router-sync.js', '~/plugins/plugins.client.js'],
    buildModules: ['@nuxtjs/eslint-module', '@nuxtjs/style-resources'],
    modules: ['@nuxtjs/pwa', '@nuxtjs/svg'],
    build: {
        extend(config) {
            config.module.rules.push({
                test: /\.(glsl|frag|vert|fs|vs)$/,
                loader: 'shader-loader',
                exclude: /(node_modules)/
            })
        }
    },
    styleResources: {
        scss: ['~/assets/scss/includes.scss']
    }
}
