const { Knex } = require("knex");

/**
 * @param {Knex} knex
 * @param {Object} props
 * @param {string} props.table
 * @param {string|undefined} props.schema
 * @param {string|undefined} props.trigger
 */
const setUpdatedAt = async (
  knex,
  { table, schema = "public", trigger = `${table}_setUpdatedAt` },
) => {
  await knex.raw(`
    create trigger "${trigger}"
    before update on "${schema}"."${table}"
    for each row
    execute procedure "setUpdatedAt"();
  `);
};

/**
 * @param {Knex} knex
 * @param {Object} props
 * @param {string} props.table
 * @param {string|undefined} props.schema
 * @param {string|undefined} props.trigger
 */
const dropUpdatedAt = async (
  knex,
  { table, schema = "public", trigger = `${table}_setUpdatedAt` },
) => {
  await knex.raw(`
    drop trigger "${trigger}" on "${schema}"."${table}";
  `);
};

exports.SetUpdatedAt = {
  v1: {
    setUpdatedAt,
    dropUpdatedAt,
  },
};
