const { Knex } = require("knex");

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  await knex.raw(`
    create extension "unaccent";
  `);
};

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  await knex.raw(`
    drop extension "unaccent";
  `);
};
