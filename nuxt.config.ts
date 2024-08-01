// https://nuxt.com/docs/api/configuration/nuxt-config
const path = require('path');
const fs = require('fs');
// @ts-ignore
export default defineNuxtConfig({
    // @ts-ignore
    experimental: {
        inlineSSRStyles: false,
        extractCSS: true
    },
    // @ts-ignore
    app: {
        head: {
            title: 'TRITAPP',
            titleTemplate: "TRITAPP | %s",
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1 , maximum-scale=1',
        },
        // pageTransition: {name: 'page', mode: 'out-in'}
    },
    routeRules: {
        // '/blog/**':{
        //     swr:true, // static page generated on demand
        //     static:true, // static page generated
        //     headers:{'Cache-Control':'no-store'}, // setting custom headers per route
        //     ssr:true, // set page ssr mode
        //     cors:true, // set page cors headers
        //     redirect:'/magazine' // redirect route
        // }
        '/**': {
            ssr: false, // set page ssr mode
        },

    },
    pageTransition: {name: 'page', mode: 'out-in'},
    devtools: {
        enabled: true
    },
    // @ts-ignore
    css: ['~/assets/css/main.css', '~/assets/fonts/Webfonts/fontiran.css'],
    link: [
        {rel: 'preload', href: "Hubot-Sans.woff2", as: "font", type: "font/woff2"}
    ],

    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },

    modules: [
        '@pinia/nuxt',
        '@pinia-plugin-persistedstate/nuxt',
        "@nuxt/scripts"
    ],
    // devServer:{
    //     host:' 192.168.237.75',
    //     port:'3001'
    // },
    runtimeConfig: {
        public: {

        },
    },


})