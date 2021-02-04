module.exports = {
  port: 3030,
  debug: true,

  snowpack: {
    mount: {
      src: '/',
      public: { url: '/', static: true, resolve: false }
    }
  },

  routes: [
    {
      path: '/',
      mode: 'all',
    }
  ]
};