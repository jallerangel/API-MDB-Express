require('dotenv').config();

//Aqui tenemos una configuracion para variables de entorno.
const config = {
  dev: process.env.NODE_ENV !== 'production',
  port: process.env.PORT || 3000,
};
module.exports = { config };
