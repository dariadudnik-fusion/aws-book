module.exports = async (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    lastname: DataTypes.STRING,
    activeProfile: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: "User",
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
  });

  return User;
};
