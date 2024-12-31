import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('rsar_db', 'root', '', {
  host: '127.0.0.1',
  port: 3307,
  dialect: 'mysql',
  logging: false,
});

export default sequelize;
