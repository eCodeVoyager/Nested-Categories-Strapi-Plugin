'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('nested-category')
      .service('myService')
      .getWelcomeMessage();
  },
});
