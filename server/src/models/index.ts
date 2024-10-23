import dotenv from 'dotenv';
dotenv.config();

import { Sequelize } from 'sequelize';
import { UserProducer } from './user.js';

const sequelize = process.env.DB_URL
? new Sequelize(process.env.DB_URL)
: new Sequelize(process.env.DB_NAME || '', process.env.DB_USER || '', process.env.DB_PASSWORD, {
  host: 'localhost',
  dialect: 'postgres',

  logging: console.log,

  dialectOptions: {
    decimalNumbers: true,
  }
});

const User = UserProducer(sequelize);

export { sequelize, User};