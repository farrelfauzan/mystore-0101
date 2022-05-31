module.exports = (sequelize, Sequelize) => {
    const Biodata = sequelize.define("Biodata", {
      bio_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model:'Users',
          key:"user_id"
        }
      },
      gender: {
        type: Sequelize.STRING,
        allowNull: false
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false
      },
      deletedAt: {
        type: Sequelize.DATE
      }
    });
    return Biodata;
  };