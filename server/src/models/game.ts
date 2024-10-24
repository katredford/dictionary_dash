import {DataTypes, Sequelize, Model, Optional } from 'sequelize';
import { User } from './user'
interface GameFields {
  id: number;
  gameType: string;
  hintsUsed: number;
  wordNumber: number;
  correctWords: number;
  userId: number;
  
}

interface GameAttributes extends Optional<GameFields, 'id'> {};

export class Game extends Model<GameFields, GameAttributes> implements GameAttributes {
  public id!: number;
  public gameType!: string;
  public hintsUsed!: number;
  public wordNumber!: number;
  public correctWords!: number;
  public userId!: number;

    // associated User model
  public readonly assignedUser?: User;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export function GameProducer(sequelize: Sequelize): typeof Game {
  Game.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      gameType: {
        type: DataTypes.STRING,
        // allowNull: false,
      },
      hintsUsed: {
        type: DataTypes.INTEGER,
        // allowNull: false,
      },
      wordNumber: {
        type: DataTypes.INTEGER,
        // allowNull: false,
      },
     correctWords: {
        type: DataTypes.INTEGER,
        // allowNull: false,
      },
     userId: {
        type: DataTypes.INTEGER,
        // allowNull: false,
      },
    },
    {
      tableName: 'tickets',
      sequelize,
    }
  );

  return Game;
}