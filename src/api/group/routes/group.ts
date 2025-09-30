export default {
  routes: [
    {
      method: 'GET',
      path: '/groups',
      handler: 'group.find',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/groups/:id',
      handler: 'group.findOne',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'POST',
      path: '/groups',
      handler: 'group.create',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'PUT',
      path: '/groups/:id',
      handler: 'group.update',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'DELETE',
      path: '/groups/:id',
      handler: 'group.delete',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
