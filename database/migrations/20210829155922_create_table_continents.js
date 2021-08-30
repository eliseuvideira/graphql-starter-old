const { Knex } = require("knex");
const { SetUpdatedAt } = require("../functions/setUpdatedAt");

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  await knex.schema.withSchema("cities").createTable("continents", (table) => {
    // Fields
    table.text("continentId").notNullable().primary();
    table.text("name").notNullable();
    table.dateTime("createdAt").notNullable().defaultTo(knex.fn.now());
    table.dateTime("updatedAt").notNullable().defaultTo(knex.fn.now());
  });

  // Set Updated At
  SetUpdatedAt.v1.setUpdatedAt(knex, {
    schema: "cities",
    table: "continents",
  });

  // Constraints
  knex.raw(`
    alter table "cities"."continents"
    add constraint "ck_cities_continents_continentId"
    check (continentId ~ '^[A-Z]{2}$');
  `);
};

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  await knex.schema.withSchema("cities").dropTable("continents");
};
