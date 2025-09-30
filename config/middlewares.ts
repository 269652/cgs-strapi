export default [
  "global::logproto",
  "strapi::logger",
  "strapi::errors",
  "strapi::security",
  "strapi::cors",
  "strapi::poweredBy",
  "strapi::query",
  "strapi::body",
  {
    name: "strapi::session",
    config: {
      cookie: {
        secure: false, // override for Railway
      },
    },
  },
  "strapi::favicon",
  "strapi::public",
];
