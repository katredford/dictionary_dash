import { DataTypes, Sequelize, Model } from 'sequelize';


export class Friends extends Model {
  public userId!: number;
  public friendId!: number;
}



export function FriendAdd(sequelize: Sequelize): typeof Friends {
  Friends.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      friendId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
    },
    {
      tableName: 'friendship',
      sequelize,
    }
  );
  return Friends;
}