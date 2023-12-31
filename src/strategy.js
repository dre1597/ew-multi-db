class NotImplementedError extends Error {
  constructor() {
    super('Not Implemented Exception');
  }
}

class ICrud {
  create(item) {
    throw new NotImplementedError();
  }

  read(query) {
    throw new NotImplementedError();
  }

  update(id, item) {
    throw new NotImplementedError();
  }

  delete(id) {
    throw new NotImplementedError();
  }
}

class MongoDB extends ICrud {
  constructor() {
    super();
  }

  create(item) {
    console.log('Item created on MongoDB');
  }
}

class Postgres extends ICrud {
  constructor() {
    super();
  }

  create(item) {
    console.log('Item created on Postgres');
  }
}

class ContextStrategy {
  constructor(strategy) {
    this._database = strategy;
  }

  create(item) {
    return this._database.create(item);
  }

  read(query) {
    return this._database.read(query);
  }

  update(id, item) {
    return this._database.update(id, item);
  }

  delete(id) {
    return this._database.delete(id);
  }
}

const contextMongo = new ContextStrategy(new MongoDB());
contextMongo.create();
contextMongo.read();

const contextPostgres = new ContextStrategy(new Postgres());
contextPostgres.create();
