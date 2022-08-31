export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: "server",
  head: {
    title:
      "SoleSearch: Buy, Sell and Bid on Authentic Sneakers and Streetwear.",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description-global",
        name: "description",
        content:
          "Buy and sell authentic sneakers and streetwear including Nike, Adidas, Yeezy, Retro Jordans, Supreme & Drew at the best price. We guarantee authenticity on every purchase or your money back."
      },
      {
        name: "facebook-domain-verification",
        content: "edyt5levyy02sifshsh631gdfxg8i5"
      }
    ],
    link: [
      // {
      //   rel: "manifest",
      //   color="#5bbad5",
      //   href: "/site.webmanifest?v=1"
      // },
      // {
      //   rel: "mask-icon",
      //   color="#5bbad5",
      //   href: "/safari-pinned-tab.svg?v=1"
      // },
      {
        rel: "stylesheet",
        rel: "preload",
        as: "style",
        href:
          "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap"
      },
      {
        rel: "shortcut icon",
        type: "image/png",
        href: "/favicon.ico?v=1"
      },
      {
        rel: "apple-touch-icon",
        type: "image/png",
        sizes: "180x180",
        href: "/apple-touch-icon.png?v=1"
      },
      {
        rel: "icon",
        type: "image/x-icon",
        href: "/favicon.ico?v=1"
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon-32x32.png"
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon-16x16.png"
      }
    ],
    script: [
      {
        hid: "razorpay",
        src: "https://checkout.razorpay.com/v1/checkout.js"
      },
      {
        id: "_webengage_script_tag",
        type: "text/javascript",
        src: "js/webengage.js",
        defer: true,
      },
      {
        type: "text/javascript",
        src: "js/newrelic.js",
      }
    ]
  },
  // script: [
  // { src: '/js/fb-sdk.js' },
  // {
  //   async: true,
  //   defer: true,
  //   appId: '1101288090321392',
  //   crossorigin: 'anonymous',
  //   src: 'https://connect.facebook.net/en_US/all.js'
  // }
  // ],
  // Global CSS (https://go.nuxtjs.dev/config-css)
  // css: ["@/assets/scss/custom.scss"],
  css: [
    // swiper style
    "swiper/css/swiper.css"
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    {
      src: "~/plugins/axios"
    },
    {
      src: "~/plugins/vue-notification"
    },
    {
      src: "~/plugins/service"
    },
    {
      src: "~/plugins/gtag",
      mode: "client"
    },
    {
      src: "~/plugins/nuxt-swiper-plugin.js",
      mode: "client"
    }
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: ["@nuxtjs/svg"],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    "bootstrap-vue/nuxt",
    // https://go.nuxtjs.dev/pwa
    "@nuxtjs/pwa",
    "@nuxtjs/style-resources",
    //   '@nuxtjs/axios',
    // '@nuxtjs/auth',
    // "@nuxtjs/gtm",
    "@nuxtjs/sitemap",
    "nuxt-facebook-pixel-module",
    '@nuxtjs/sentry'
  ],
  sentry: {
    dsn: 'https://5ad6f59385b246229f9a4ff602bdf2dd@o1323188.ingest.sentry.io/6580698',
    // Additional Module Options go here
    tracesSampleRate: 0.2,
    vueOptions: {
      tracing: true,
      tracingOptions: {
        hooks: ['mount', 'update'],
        timeout: 2000,
        trackComponents: true
      }
    },
    browserOptions: {},
    // https://sentry.nuxtjs.org/sentry/options
    config: {
      // Add native Sentry config here
      // https://docs.sentry.io/platforms/javascript/guides/vue/configuration/options/
    },
  },
  facebook: {
    track: "PageView",
    pixelId: "929120921330840",
    autoPageView: true,
    disabled: false
  },
  gtm: {
    id: "GTM-NQPH64H",
    pageTracking: true,
    enabled: true
  },
  bootstrapVue: {
    componentPlugins: [],
    directivePlugins: []
  },
  // googleAnalytics: {
  //   checkDuplicatedScript: true,
  //   id: "G-LQB4ZTV2RD",
  //   layer: "dataLayer",
  //   pageTracking: true,
  //   debug: { sendHitTask: true }
  // },
  styleResources: {
    scss: ["assets/scss/_variables.scss"]
  },
  // auth: {
  //   strategies: {
  //     facebook: {
  //       client_id: '1101288090321392',
  //       userinfo_endpoint: 'https://graph.facebook.com/v2.12/me?fields=about,name,picture{url},email,birthday',
  //       scope: ['public_profile', 'email', 'user_birthday']
  //     },
  //   }
  // },
  router: {
    middleware: ["check-auth"]
  },
  // Build Configuration (https://go.nuxtjs.dev/config-build)
  publicRuntimeConfig: {
    cloudinaryBaseURL: process.env.CLOUDINARY_BASE_URL,
    drypApiURL: "http://solesearch.radixdev80.com:3001/admin-panel/api",
    razorpayKeyId: process.env.RAZORPAY_KEY_ID
  },
  serverMiddleware: ["~/serverMiddleware/seo.js"],
  server: {
    host: "0.0.0.0",
    port: 8001 // default: 3000
  },

  loading: '~/components/LoadingBar.vue'

  // extend(config, { isClient }) {
  //   if (isClient) {
  //     config.devtool =
  //       process.env.NODE_ENV === "development" ? "inline-source-map" : "";
  //   }
  // }

};
