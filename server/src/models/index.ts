import dotenv from 'dotenv';
dotenv.config();

import { Sequelize } from 'sequelize';
import { UserProducer } from './user.js';
import { GameProducer } from './game.js';
import { FriendAdd } from './friends.js';

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
const FriendShip = FriendAdd(sequelize);

User.hasMany(Game, { foreignKey: 'userId' });
User.belongsToMany(User, {
  through: FriendShip, // Name of the join table
  as: 'friends',      // Alias for the relationship
  foreignKey: 'userId',
  otherKey: 'friendId'
});
Game.belongsTo(User, { foreignKey: 'userId', as: 'assignedUser' })
export { sequelize, User, Game, FriendShip };