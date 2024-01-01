const assert = require('assert');
const api = require('../src/api');


let app = {};
describe('API', function () {
  this.beforeAll(async () => {
    app = await api;
  });

  it('GET /', async () => {
    const result = await app.inject({
      method: 'GET',
      url: '/'
    });
    assert.equal(result.statusCode, 200);
  });
});
