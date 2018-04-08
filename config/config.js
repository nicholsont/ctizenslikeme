require('dotenv').config()

const connectionParams = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOSTNAME,
  dialect: 'postgres'
}

module.exports = {
  development: connectionParams,
  production: connectionParams
};
