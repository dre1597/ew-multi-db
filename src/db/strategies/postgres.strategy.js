const ICrud = require('./base/interfaces/ICrud.interface');

class PostgresStrategy extends ICrud {
  constructor() {
    super();
  }

  create(item) {
    console.log('Item created on Postgres');
  }
}

module.exports = PostgresStrategy;
