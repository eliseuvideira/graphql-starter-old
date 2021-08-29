const { Knex } = require("knex");

const TIMEZONE_NEW = "America/Sao_Paulo";
const TIMEZONE_OLD = "Etc/UTC";

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  const DATABASE_NAME = knex.client.config.connection.database;

  await knex.raw(`
    alter database "${DATABASE_NAME}" set timezone='${TIMEZONE_NEW}';
  `);
};

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  const DATABASE_NAME = knex.client.config.connection.database;

  await knex.raw(`
    alter database "${DATABASE_NAME}" set timezone='${TIMEZONE_OLD}';
  `);
};
