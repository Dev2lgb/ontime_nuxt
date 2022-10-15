import colors from 'vuetify/es5/util/colors'

export default {
  server: {
    port: process.env.PORT, host: process.env.HOST
  },

  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - ONTIMEWORLD',
    title: 'ONTIMEWORLD',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/style.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '@/plugins/vue-awesome-swiper', mode: 'client' },
    { src: '@/plugins/api.js', mode: 'client' },
    { src: '@/plugins/google-map.js', mode: 'client' },
    { src: '@/plugins/main.js', mode: 'client' },
    { src: '@/plugins/chart.js', mode: 'client' },
  ],


  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/laravel-echo',
    '@nuxtjs/dotenv'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/i18n',
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/dotenv',
    '@nuxtjs/dayjs',
    '@nuxtjs/toast',
],
  //알러트 설정
  toast: {
    position: 'top-center',
    duration : 3000,
  },
  i18n: {
    locales: [
      {
        code: 'en',
        file: 'en.json'
      },
      {
        code: 'ko',
        file: 'ko.json'
      }
    ],
    langDir: 'locales/',
    defaultLocale: 'ko',
    vueI18n: {
     // Path: '~/locales/',
      fallbackLocale: 'ko'
    },
  },
  axios: {
    baseUrl: process.env.BASEURL + '/api',
    credentials: true
  },

  auth: {
    redirect: {
      login: '/auth/login',
      logout: '/auth/login',
      callback: '/auth/login',
      home: '/home'
    },
    strategies : {
      'laravelSanctum' : {
        provider : 'laravel/sanctum',
        url : process.env.BASEURL,
        endpoints: {
          login: {
            url: '/api/auth/login',
          },
          logout: {
            url: '/api/auth/logout',
          },
        }
      }
    }
  },

  // Vuetify modules configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  echo: {
    plugins: [ '~/plugins/echo.client.js' ],
    broadcaster: 'pusher',
    key: 'c9b99dbda5c8e42c8793',
    cluster: 'ap3',
    authEndpoint: process.env.BASEURL + '/api/broadcasting/auth',
    /*encrypted: true,
    authModule: true,
    connectOnLogin: true,
    disconnectOnLogout: true,*/
    optionsPath: '~/plugins/laravel-echo.options.js'
  },

  dayjs: {

    locales: ['en', 'ko'], defaultLocale: 'ko', defaultTimeZone: 'Asia/Seoul',
    plugins: [
      'utc', // import 'dayjs/plugin/utc'
      'timezone', // import 'dayjs/plugin/timezone'
    ] // Your Day.js plugin
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^vue2-google-maps($|\/)/]
  }
}
