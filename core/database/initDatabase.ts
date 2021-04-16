import { User } from 'models';

const initDatabase = async () => {
  await User.sync({ force: true });
};

export default initDatabase;
