const { Knex } = require("knex");
const { SetUpdatedAt } = require("../functions/setUpdatedAt");

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  await knex.schema.withSchema("cities").createTable("countries", (table) => {
    // Fields
    table.text("countryId").notNullable().primary();
    table.text("name").notNullable();
    table.text("continentId").notNullable();
    table.dateTime("createdAt").notNullable().defaultTo(knex.fn.now());
    table.dateTime("updatedAt").notNullable().defaultTo(knex.fn.now());

    // Foreign Keys
    table
      .foreign("continentId")
      .references("continentId")
      .inTable("cities.continents")
      .onDelete("no action")
      .onUpdate("cascade");
  });

  // Set Updated At
  SetUpdatedAt.v1.setUpdatedAt(knex, {
    schema: "cities",
    table: "countries",
  });

  // Constraints
  knex.raw(`
    alter table "cities"."countries"
    add constraint "ck_cities_countries_countryId"
    check (countryId ~ '^[0-9]+\.[0-9]+\.[0-9](-[a-z0-9]+)\\?$');
  `);
};

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  await knex.schema.withSchema("cities").dropTable("countries");
};
