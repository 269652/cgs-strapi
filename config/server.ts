export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  url: env('PUBLIC_URL', 'https://your-app.up.railway.app'),
  proxy: true, // trust x-forwarded-* headers
  app: {
    keys: env.array('APP_KEYS'),
  },
});
