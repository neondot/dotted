module.exports = {
  port: 3030,
  debug: true,

  snowpack: {
    mount: {
      src: '/',
      public: { url: '/', static: true, resolve: false }
    },
    devOptions: {
      hmr: true,
      hmrPort: 4000,
    },
    buildOptions: {
      watch: true,
    },
  },

  routes: [
    {
      path: '/',
      mode: 'all',
    }
  ],

  head: {
    title: 'Dotted App',
    meta: [],
  },
};