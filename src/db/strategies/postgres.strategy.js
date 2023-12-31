const ICrud = require('./base/interfaces/ICrud.interface');
const Sequelize = require('sequelize');

class PostgresStrategy extends ICrud {
  constructor() {
    super();
    this._driver = null;
    this._heroes = null;
    this._connect();
  }

  _connect() {
    this._driver = new Sequelize('heroes', 'postgres', 'postgres', {
      host: 'localhost',
      dialect: 'postgres',
      quoteIdentifiers: false,
      operatorsAliases: false,
      port: 5435,
    });

    this._defineModel();
  }

  _defineModel() {
    this._heroes = this._driver.define('heroes', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        power: {
          type: Sequelize.STRING,
          allowNull: false
        }
      },
      {
        tableName: 'hero',
        timestamps: false
      });
  }

  create(item) {
    console.log('Item created on Postgres');
  }

  async isConnected() {
    try {
      await this._driver.authenticate();
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}

module.exports = PostgresStrategy;
