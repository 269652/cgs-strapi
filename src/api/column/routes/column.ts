export default {
  routes: [
    {
      method: 'GET',
      path: '/columns',
      handler: 'column.find',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/columns/:id',
      handler: 'column.findOne',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'POST',
      path: '/columns',
      handler: 'column.create',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'PUT',
      path: '/columns/:id',
      handler: 'column.update',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'DELETE',
      path: '/columns/:id',
      handler: 'column.delete',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};