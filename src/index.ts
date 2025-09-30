// src/index.js
const cfg = {
  async bootstrap({ strapi }) {
    if (strapi?.server?.app) {
      strapi.server.app.proxy = true;
      strapi.log.info('✅ Koa proxy trust enabled');
    }
  },
};

export default cfg;