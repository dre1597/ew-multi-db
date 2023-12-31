const ICrud = require('./base/interfaces/ICrud.interface');

class MongoDBStrategy extends ICrud {
  constructor() {
    super();
  }

  create(item) {
    console.log('Item created on MongoDB');
  }
}

module.exports = MongoDBStrategy;
