export default {
  routes: [
    {
      method: 'GET',
      path: '/sections',
      handler: 'section.find',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/sections/:id',
      handler: 'section.findOne',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'POST',
      path: '/sections',
      handler: 'section.create',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'PUT',
      path: '/sections/:id',
      handler: 'section.update',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'DELETE',
      path: '/sections/:id',
      handler: 'section.delete',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
