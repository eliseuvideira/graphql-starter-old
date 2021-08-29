const { Knex } = require("knex");
const { ParseRaw } = require("../functions/parseRaw");

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  await knex.raw(
    ParseRaw.v1.parseRaw(`
      create extension "unaccent";
    `),
  );
};

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  await knex.raw(
    ParseRaw.v1.parseRaw(`
      drop extension "unaccent";
    `),
  );
};
