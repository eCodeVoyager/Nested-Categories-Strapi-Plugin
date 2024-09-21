"use strict";

module.exports = ({ strapi }) => {
  // register phase
  strapi.customFields.register({
    name: "nestedCategory",
    plugin: "nested-category",
    type: "json",
  });
};
