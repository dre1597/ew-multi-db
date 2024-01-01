const ICrud = require('../interfaces/ICrud.interface');
const Sequelize = require('sequelize');

class PostgresStrategy extends ICrud {
  constructor(connection, schema) {
    super();
    this._connection = connection;
    this._schema = schema;
  }

  static async defineModel(connection, schema) {
    const model = connection.define(schema.name, schema.schema, schema.options);
    await model.sync();
    return model;
  }

  static async connect() {
    return new Sequelize('heroes', 'postgres', 'postgres', {
      host: 'localhost',
      dialect: 'postgres',
      quoteIdentifiers: false,
      operatorsAliases: false,
      port: 5435,
      logging: false,
    });
  }

  async isConnected() {
    try {
      await this._connection.authenticate();
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async create(item) {
    const { dataValues: result } = await this._schema.create(item);
    return result;
  }

  async read(query = {}) {
    return await this._schema.findAll({ where: query, raw: true });
  }

  async update(id, item) {
    delete item.id;
    await this._schema.update(item, { where: { id } });
  }

  async delete(id) {
    const query = id ? { id } : {};
    await this._schema.destroy({ where: query });
  }
}

module.exports = PostgresStrategy;
