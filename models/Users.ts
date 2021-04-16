import { getDatabase } from 'core/database';
import { Model, Optional, DataTypes } from 'sequelize';

const sequelize = getDatabase();

interface UserAttributes {
  id?: string;
  uuid: string;
  public_address: string;
  private_address: string;
}

type UserCreationAttributes = Optional<UserAttributes, 'id'>;

class User extends Model<UserAttributes, UserCreationAttributes> {}

User.init(
  {
    uuid: {
      type: DataTypes.STRING,
      allowNull: false
    },
    public_address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    private_address: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'User' // We need to choose the model name
  }
);

export default User;
