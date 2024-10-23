import { DataTypes, Sequelize, Model, Optional } from 'sequelize';
import { Friends } from './friends.js';
import bcrypt from 'bcrypt';

interface UserFields {
  id: number;
  username: string;
  password: string;
}

interface UserCreateFields extends Optional<UserFields, 'id'> { }

export class User extends Model<UserFields, UserCreateFields> implements UserFields {
  public id!: number;
  public username!: string;
  public password!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public async setPassword(password: string) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(password, saltRounds)
  }

  public async addFriend(friendId: number) {
    const friend = await User.findByPk(friendId);
    if (!friend) {
      throw new Error('Friend not found');
    }
    await Friends.create({ userId: this.id, friendId });
  }
}




export function UserProducer(sequelize: Sequelize): typeof User {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        // unique: true,
        // allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        // unique: true,
        // allowNull:false,
      },
    },
    {
      tableName: 'users',
      sequelize,
      hooks: {
        beforeCreate: async (user: User) => {
          await user.setPassword(user.password);
        },
        beforeUpdate: async (user: User) => {
          await user.setPassword(user.password);
        },
      }
    }
  );
  return User;
};