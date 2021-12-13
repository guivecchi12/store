// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/store.db3'
    }
  },

  production: {
    client: 'pg',
    connection: {
      connectionString:process.env.DATABASE_URL,
      ssl: {rejectUnauthorized: false}
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tablename: 'knex_migrations',
      directory: './migrations'
    }
  }

};
