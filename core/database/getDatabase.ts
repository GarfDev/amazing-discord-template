import { Sequelize } from 'sequelize';

const databaseInitialize = () => {
  const sequelize = new Sequelize('sqlite::memory:');
  return () => sequelize;
};

export default databaseInitialize();
