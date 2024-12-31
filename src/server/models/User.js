const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true
  },
  facebookId: {
    type: DataTypes.STRING,
    unique: true
  },
  googleId: {
    type: DataTypes.STRING,
    unique: true
  },
  profilePicture: {
    type: DataTypes.STRING,
    allowNull: true
  },
  provider: {
    type: DataTypes.STRING,
    allowNull: false
  },
  verified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

// Sync model with database
User.sync()
    .then(() => console.log('User table created successfully'))
    .catch(err => console.error('Error creating User table:', err));

module.exports = User;
