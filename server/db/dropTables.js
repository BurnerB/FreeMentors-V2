import client from './Db';

const dotenv = require('dotenv');

dotenv.config();

const dropTables = async () => {
  await client.query('DROP TABLE IF EXISTS sessions, users CASCADE');
  await client.end();
};

module.exports = { dropTables };
require('make-runnable');
