const ICrud = require('./base/interfaces/ICrud.interface');
const Mongoose = require('mongoose');

const STATUS = {
  0: 'Disconnected',
  1: 'Connected',
  2: 'Connecting',
  3: 'Disconnecting',
};

class MongoDBStrategy extends ICrud {
  constructor() {
    super();
    this._heroes = null;
    this._driver = null;
  }

  async isConnected() {
    const state = STATUS[this._driver.readyState];
    if (state === 'Connected') return state;
    if (state !== 'Connecting') return state;
    await new Promise(resolve => setTimeout(resolve, 1000));
    return STATUS[this._driver.readyState];
  }

  async connect() {
    Mongoose.connect('mongodb://normaluser:normaluser@localhost:27017/heroes', {
      useNewUrlParser: true
    }, function (error) {
      if (!error) return;
      console.log('Connection failed!', error);
    });

    this._driver = Mongoose.connection;
    this._driver.once('open', () => console.log('Database is running'));
    this._defineModel();
  }

  _defineModel() {
    const heroesSchema = new Mongoose.Schema({
      name: {
        type: String,
        required: true
      },
      power: {
        type: String,
        required: true
      },
      insertedAt: {
        type: Date,
        default: new Date()
      }
    });

    this._heroes = Mongoose.models.heroes || Mongoose.model('heroes', heroesSchema);
  }

  create(item) {
    return this._heroes.create(item);
  }

  read(item = {}) {
    return this._heroes.find(item, { name: 1, power: 1, insertedAt: 1 });
  }

  update(id, item) {
    return this._heroes.updateOne({ _id: id }, { $set: item });
  }

  delete(id) {
    return this._heroes.deleteOne({ _id: id });
  }
}

module.exports = MongoDBStrategy;
