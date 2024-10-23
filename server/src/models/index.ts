import dotenv from 'dotenv';
dotenv.config();

import { Sequelize } from 'sequelize';
import { UserProducer } from './user.js';
import { GameProducer } from './game.js';

const sequelize = process.env.DB_URL
? new Sequelize(process.env.DB_URL)
: new Sequelize(process.env.DB_NAME || '', process.env.DB_USER || '', process.env.DB_PASSWORD, {
  host: 'localhost',
  dialect: 'postgres',
  dialectOptions: {
    decimalNumbers: true,
  }
});

const User = UserProducer(sequelize);
const Game = GameProducer(sequelize);

User.hasMany(Game, {foreignKey: 'userId'});
Game. belongsTo(User, {foreignKey: 'userId', as: 'assignedUser'})
export { sequelize, User, Game};