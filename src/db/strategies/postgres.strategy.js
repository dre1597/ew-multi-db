const ICrud = require('./base/interfaces/ICrud.interface');
const Sequelize = require('sequelize');

class PostgresStrategy extends ICrud {
  constructor() {
    super();
    this._driver = null;
    this._heroes = null;
  }

  async connect() {
    this._driver = new Sequelize('heroes', 'postgres', 'postgres', {
      host: 'localhost',
      dialect: 'postgres',
      quoteIdentifiers: false,
      operatorsAliases: false,
      port: 5435,
    });

    await this._defineModel();
  }

  async _defineModel() {
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

    await this._driver.sync();
  }

  async create(item) {
    const { dataValues: result } = await this._heroes.create(item);
    return result;
  }

  async read(query = {}) {
    return await this._heroes.findAll({ where: query, raw: true });
  }

  async update(id, item) {
    delete item.id;
    await this._heroes.update(item, { where: { id } });
  }

  async delete(id) {
    const query = id ? { id } : {};
    await this._heroes.destroy({ where: query });
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
