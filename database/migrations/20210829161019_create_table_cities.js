const { Knex } = require("knex");
const { SetUpdatedAt } = require("../functions/setUpdatedAt");

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  await knex.schema.withSchema("cities").createTable("cities", (table) => {
    // Fields
    table.increments("cityId").notNullable().primary();
    table.text("name").notNullable();
    table.integer("population").notNullable();
    table.decimal("latitude", 21, 10).notNullable();
    table.decimal("longitude", 21, 10).notNullable();
    table.text("countryId").notNullable();
    table.dateTime("createdAt").notNullable().defaultTo(knex.fn.now());
    table.dateTime("updatedAt").notNullable().defaultTo(knex.fn.now());

    // Foreign Keys
    table
      .foreign("countryId")
      .references("countryId")
      .inTable("cities.countries")
      .onDelete("no action")
      .onUpdate("cascade");
  });

  // Set Updated At
  SetUpdatedAt.v1.setUpdatedAt(knex, {
    schema: "cities",
    table: "cities",
  });
};

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  await knex.schema.withSchema("cities").dropTable("cities");
};
