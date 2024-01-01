const NotImplementedError = require('../../exceptions/not-implemented-error.error');

class ICrud {
  static connect() {
    throw new NotImplementedError();
  }

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

  isConnected() {
    throw new NotImplementedError();
  }
}

module.exports = ICrud;
