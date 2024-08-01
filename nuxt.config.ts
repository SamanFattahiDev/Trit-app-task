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
            title: 'ITCARE',
            titleTemplate: "ITCARE | %s",
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
    scripts: [
        {src: '/aos.js', defer: true, body: true}
    ],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },

    modules: [
        '@pinia/nuxt',
        '@nuxt/image',
        'nuxt-swiper',
        '@pinia-plugin-persistedstate/nuxt',
        '@vite-pwa/nuxt',
        "@nuxt/scripts"
    ],
    pwa: {
        registerType: 'autoUpdate',
        manifest: {
            // this restricts [id] navigation to some directories of website
            // scope: "https://example.com/subdirectory/",
            id:'/introduction',
            name: 'ITCARE',
            short_name: 'ITCARE',
            theme_color: '#8BD8BD',
            description: "اولین ارائه دهنده خدمات غیر متمرکز پشتیبانی فناوری اطلاعات",
            background_color: "#243665",
            dir: "rtl",
            lang: "fa",
            display: "standalone",
            start_url: "/sign-in",

            icons: [
                {
                    "src": "/pwa/android-chrome-192x192v2.png",
                    "sizes": "192x192",
                    "type": "image/png"
                },
                {
                    "src": "/pwa/android-chrome-512x512v2.png",
                    "sizes": "512x512",
                    "type": "image/png"
                },
                {
                    "src": "/pwa/favicon-16x16.png",
                    "sizes": "16x16",
                    "type": "image/png"
                },
                {
                    "src": "/pwa/apple-touch-iconv2.png",
                    "sizes": "180x180",
                    "type": "image/png"
                },
                {
                    "src": "/pwa/favicon-32x32.png",
                    "sizes": "32x32",
                    "type": "image/png"
                },
                {
                    "src": "/pwa/favicon.ico",
                    "sizes": "16x16",
                    "type": "image/ico"
                }
            ],
        },
        workbox: {
            cleanupOutdatedCaches: true,
            // this is for caching internal assets, by default it only supports js css html.
            // configure it to include or exclude some type of assets
            // globPatterns: ['**/*.{js,css,html,ico,png,svg}']
            clientsClaim:true,
            skipWaiting:true,
            runtimeCaching: [
                // this is used for caching third-party resources.
                // {
                //     urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
                //     handler: 'CacheFirst',
                //     options: {
                //         cacheName: 'google-fonts-cache',
                //         expiration: {
                //             maxEntries: 10,
                //             maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
                //         },
                //         cacheableResponse: {
                //             statuses: [0, 200]
                //         }
                //     }
                // },
            ]
        }
    },
    devServer:{
        host:' 192.168.237.75',
        port:'3001'
    },
    runtimeConfig: {
        public: {
            baseURL:'https://api.itcare.ir/api' ,
            pictureUrl: process.env.NUXT_PUBLIC_BASE_URL,
        },
    },


})