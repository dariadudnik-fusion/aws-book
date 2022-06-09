module.exports = async(sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    genre: DataTypes.STRING,
    author: DataTypes.STRING,
  }, {
    sequelize,
    modelName: "Book",
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
  });

  return Book;
};
