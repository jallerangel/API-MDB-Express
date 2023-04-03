require('dotenv').config();

//Aqui tenemos una configuracion para variables de entorno.
const config = {
  dev: process.env.NODE_ENV !== 'production',
  port: process.env.PORT || 3000,
  cors: process.env.CORS,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dbNameTest: process.env.DB_NAME_TEST,
};
module.exports = { config };
