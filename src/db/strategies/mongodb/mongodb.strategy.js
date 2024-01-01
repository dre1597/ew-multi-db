const ICrud = require('../interfaces/ICrud.interface');
const Mongoose = require('mongoose');

const STATUS = {
  0: 'Disconnected',
  1: 'Connected',
  2: 'Connecting',
  3: 'Disconnecting',
};

class MongoDBStrategy extends ICrud {
  constructor(connection, schema) {
    super();
    this._schema = schema;
    this._connection = connection;
  }

  static connect() {
    Mongoose.connect('mongodb://normaluser:normaluser@localhost:27017/heroes', {
      useNewUrlParser: true
    }, function (error) {
      if (!error) return;
      console.log('Connection failed!', error);
    });

    const connection = Mongoose.connection;
    connection.once('open', () => console.log('Database is running'));
    return connection;
  }

  async isConnected() {
    const state = STATUS[this._connection.readyState];
    if (state === 'Connected') return state;
    if (state !== 'Connecting') return state;
    await new Promise(resolve => setTimeout(resolve, 1000));
    return STATUS[this._driver.readyState];
  }

  create(item) {
    return this._schema.create(item);
  }

  read(item = {}) {
    return this._schema.find(item, { name: 1, power: 1, insertedAt: 1 });
  }

  update(id, item) {
    return this._schema.updateOne({ _id: id }, { $set: item });
  }

  delete(id) {
    return this._schema.deleteOne({ _id: id });
  }
}

module.exports = MongoDBStrategy;
