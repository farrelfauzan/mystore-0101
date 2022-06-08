const dbConfig = require("../config/db.config");

const Sequelize = require("sequelize");

const client = new Sequelize(
  dbConfig.DATABASE,
  dbConfig.USERNAME,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    port: dbConfig.PORT,
    dialect: dbConfig.dialect,
    dialectOptions: {},
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle,
    },
  }
);

const db = {};

db.Sequelize = Sequelize;
db.client = client;
db.users = require("./user")(client, Sequelize);
db.products = require("./product")(client, Sequelize);
db.biodata = require("./biodata")(client, Sequelize);

module.exports = db;
