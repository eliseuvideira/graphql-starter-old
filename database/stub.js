const { Knex } = require("knex");
const { SetUpdatedAt } = require("../functions/setUpdatedAt");

const SCHEMA_NAME = "packages";
const TABLE_NAME = "packages";

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  await knex.schema.withSchema(SCHEMA_NAME).createTable(TABLE_NAME, (table) => {
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
    schema: SCHEMA_NAME,
    table: TABLE_NAME,
  });

  // Constraints
  knex.raw(`
    alter table "${SCHEMA_NAME}"."${TABLE_NAME}"
    add constraint "ck_${SCHEMA_NAME}_${TABLE_NAME}_version"
    check (version ~ '^[0-9]+\.[0-9]+\.[0-9](-[a-z0-9]+)\\?$');
  `);
};

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  await knex.schema.withSchema(SCHEMA_NAME).dropTable(TABLE_NAME);
};
