import dotenv from 'dotenv';

const env = process.env.NODE_ENV;

dotenv.config();

const dev = {
  db: process.env.DATABASE_URL,
};

const config = {
  dev,
};

module.exports = config[env];
