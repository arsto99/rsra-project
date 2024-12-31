import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class User extends Model {
  public id!: number;
  public email?: string;
  public username?: string;
  public password?: string;
  public name!: string;
  public facebookId?: string;
  public instagramId?: string;
  public role!: string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    facebookId: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true,
    },
    instagramId: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'user',
    }
  },
  {
    sequelize,
    modelName: 'User',
    timestamps: true,
  }
);

export default User;
