module.exports = (sequelize, Sequelize) => {
  const Users = sequelize.define("Users", {
    user_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    role:{
      type:Sequelize.STRING,
      allowNull: false,
      defaultValue: "user"
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    deletedAt: {
      type: Sequelize.DATE,
    },
  });


  return Users;
};
