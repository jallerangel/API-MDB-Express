const bcrypt = require('bcrypt');
const chalk = require('chalk');
const MongoLib = require('../../lib/mongo');
const { config } = require('../../config');

const users = [
  {
    email: 'wmccoughan0@si.edu',
    name: 'ROOT',
    password: config.defaultAdminPassword,
    isAdmin: true,
  },
  {
    name: 'Reggie',
    email: 'rcobley0@newyorker.com',
    password: config.defaultUserPassword,
  },
  {
    name: 'Phebe',
    email: 'plamp1@usgs.gov',
    password: config.defaultUserPassword,
  },
  {
    name: 'Sutherlan',
    email: 'sbardwell2@irs.gov',
    password: config.defaultUserPassword,
  },
  {
    name: 'Fidelia',
    email: 'fporte3@symantec.com',
    password: config.defaultUserPassword,
  },
];

async function createUser(mongoDB, user) {
  const { name, email, password, isAdmin } = user;
  const hashedPassword = await bcrypt.hash(password, 10);

  const userId = await mongoDB.create('users', {
    name,
    email,
    password: hashedPassword,
    isAdmin: Boolean(isAdmin),
  });
  return userId;
}

async function seedUsers() {
  try {
    const mongoDB = new MongoLib();
    const promises = users.map(async (user) => {
      const userId = await createUser(mongoDB, user);
      // eslint-disable-next-line no-console
      console.log(chalk.cyanBright.bgBlack(`Users created with id: ${userId}`));
    });
    await Promise.all(promises);
    return process.exit(0);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(chalk.red.bgBlack(e));
    process.exit(1);
  }
}

seedUsers();
