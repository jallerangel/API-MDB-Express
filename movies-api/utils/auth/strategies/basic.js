const passport = require('passport');
const { BasicStrategy } = require('passport-http');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const UsersService = require('../../../services/users');

passport.use(
  new BasicStrategy(async (email, password, cb) => {
    const usersService = new UsersService();

    try {
      const user = await usersService.getUser({ email });

      if (!user) return cb(boom.unauthorized(), false);

      if (!(await bcrypt.compare(password, user.password))) {
        return cb(boom.unauthorized(), false); //Solemos devolver solo la respuesta de que el user no esta autorizado ya que dar mucha informacion sobre un proceso de auth nos puede poner en peligro de ataques.
      }

      delete user.password; //eliminamos el password del objeto user y asi nos aseguramos de que mas adelante en el uso de la aplicacion no pueda ser encontrado o visto.

      return cb(null, user);
    } catch (e) {
      return cb(e);
    }
  })
);
