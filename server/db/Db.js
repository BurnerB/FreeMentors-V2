import { Client } from 'pg';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();
const client = process.env.NODE_ENV === 'test'
  ? new Client({ connectionString: process.env.TESTDB_URL })
  : new Client({ connectionString: process.env.DATABASE_URL });

const users = `CREATE TABLE IF NOT EXISTS
  users(
    id serial PRIMARY KEY,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL ,
    password VARCHAR(255) NOT NULL,
    address VARCHAR(150) NOT NULL,
    bio VARCHAR(500) NOT NULL,
    occupation VARCHAR(500) NOT NULL,
    expertise VARCHAR(500) NOT NULL,
    isMentor BOOL DEFAULT false NOT NULL,
    isAdmin BOOL DEFAULT false NOT NULL,
    created_On TIMESTAMP DEFAULT NOW()
  )`;
const sessions = `CREATE TABLE IF NOT EXISTS
  sessions(
    id serial PRIMARY KEY,
    mentorId INT NOT NULL,
    menteeId INT NOT NULL,
    questions VARCHAR(250) NOT NULL ,
    menteeEmail VARCHAR(50) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending' NOT NULL,
    created_On TIMESTAMP DEFAULT NOW()
  )`;

const createAdmin = async () => {
  const sql = `SELECT * FROM users WHERE email='${process.env.EMAIL}'`;
  const { rows } = await client.query(sql);
  if (rows.length === 0) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(process.env.PASSWORD, salt);
    const adminUser = {
      firstname: 'Im',
      lastname: 'admin',
      email: process.env.EMAIL,
      password: hashedPassword,
      address: 'Nairobi Kenya',
      bio: 'rapper, record producer, and actor who was known as one of the most-controversial and best-selling artists of the early 21st century',
      occupation: 'Musician',
      expertise: 'rapping',
      isMentor: false,
      isAdmin: true,
    };
    const sqlAdmin = 'INSERT INTO users (firstname, lastname, email, password, address,bio,occupation,expertise,isMentor,isAdmin ) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) returning *;';
    const value = [adminUser.firstname, adminUser.lastname, adminUser.email,
      adminUser.password, adminUser.address, adminUser.bio, adminUser.occupation,
      adminUser.expertise, adminUser.isMentor, adminUser.isAdmin];
    await client.query(sqlAdmin, value);
  }
};

client.connect();

if (process.env.NODE_ENV === 'test') {
  client.query('DROP TABLE IF EXISTS users');
  client.query('DROP TABLE IF EXISTS sessions');
  client.query(users);
  client.query(sessions);
} else {
  client.query(users);
  createAdmin();
  client.query(sessions);
}

export default client;
