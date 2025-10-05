export default {
  routes: [
    {
      method: 'GET',
      path: '/contents',
      handler: 'content.find',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/contents/:id',
      handler: 'content.findOne',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'POST',
      path: '/contents',
      handler: 'content.create',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'PUT',
      path: '/contents/:id',
      handler: 'content.update',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'DELETE',
      path: '/contents/:id',
      handler: 'content.delete',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};