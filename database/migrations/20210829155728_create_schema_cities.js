const { Knex } = require("knex");

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  await knex.raw(`
    create schema cities;
  `);
};

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  await knex.raw(`
    drop schema cities;
  `);
};
