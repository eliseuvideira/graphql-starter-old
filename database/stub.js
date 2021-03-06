const { Knex } = require("knex");
const { SetUpdatedAt } = require("../functions/setUpdatedAt");

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  await knex.schema.withSchema("packages").createTable("packages", (table) => {
    // Fields
    table.increments("packageId").notNullable().primary();
    table.text("name").notNullable();
    table.text("version").notNullable();
    table.text("description");
    table.integer("userId").notNullable();
    table.dateTime("createdAt").notNullable().defaultTo(knex.fn.now());
    table.dateTime("updatedAt").notNullable().defaultTo(knex.fn.now());

    // Foreign Keys
    table
      .foreign("userId")
      .references("userId")
      .inTable("users")
      .onDelete("no action")
      .onUpdate("cascade");
  });

  // Set Updated At
  SetUpdatedAt.v1.setUpdatedAt(knex, {
    schema: "packages",
    table: "packages",
  });

  // Constraints
  knex.raw(`
    alter table "packages"."packages"
    add constraint "ck_packages_packages_version"
    check (version ~ '^[0-9]+\.[0-9]+\.[0-9](-[a-z0-9]+)\\?$');
  `);
};

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  await knex.schema.withSchema("packages").dropTable("packages");
};
