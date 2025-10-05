export default {
  routes: [
    {
      method: "GET",
      path: "/navigation-entries",
      handler: "navigation-entry.find",
      config: {
        policies: []
      }
    },
    {
      method: "GET",
      path: "/navigation-entries/:id",
      handler: "navigation-entry.findOne",
      config: {
        policies: []
      }
    },
    {
      method: "POST",
      path: "/navigation-entries",
      handler: "navigation-entry.create",
      config: {
        policies: []
      }
    },
    {
      method: "PUT",
      path: "/navigation-entries/:id",
      handler: "navigation-entry.update",
      config: {
        policies: []
      }
    },
    {
      method: "DELETE",
      path: "/navigation-entries/:id",
      handler: "navigation-entry.delete",
      config: {
        policies: []
      }
    }
  ]
};