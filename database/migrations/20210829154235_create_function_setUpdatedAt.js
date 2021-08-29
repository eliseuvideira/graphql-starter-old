const { Knex } = require("knex");

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  await knex.raw(`
    create function "setUpdatedAt"()
    returns trigger
    as $$
    begin
      NEW."updatedAt" = now();
      return NEW;
    end
    $$ language plpgsql;
  `);
};

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  await knex.raw(`
    drop function "setUpdatedAt";
  `);
};
