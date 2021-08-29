/**
 * @param {string} sql
 */
const parseRaw = (sql) =>
  sql.trim().replace(/^\s*/gm, "").replace(/\s*$/gm, "");

exports.ParseRaw = {
  v1: {
    parseRaw,
  },
};
