const assert = require('assert');
const PostgresStrategy = require('../../../src/db/strategies/postgres.strategy');
const Context = require('../../../src/db/strategies/base/context.strategy');

const context = new Context(new PostgresStrategy());

describe('Postgres Strategy', function () {
  this.timeout(Infinity);

  it('Postgres connection', async () => {
    const result = await context.isConnected();
    assert.equal(result, true);
  });
});
