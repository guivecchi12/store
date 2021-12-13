const knex = require("knex");
const dbEngine = 'development';
const knexfile = require("../knexfile")[dbEngine]

module.exports = knex(knexfile)