export default () => {
  return async (ctx, next) => {
    strapi.log.info(
      `[PROTO] x-forwarded-proto=${ctx.get('x-forwarded-proto')} protocol=${ctx.protocol} secure=${ctx.secure}`
    );
    await next();
  };
};
