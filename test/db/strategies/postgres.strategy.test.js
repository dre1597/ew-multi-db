const assert = require('assert');
const PostgresStrategy = require('../../../src/db/strategies/postgres.strategy');
const Context = require('../../../src/db/strategies/base/context.strategy');

const context = new Context(new PostgresStrategy());
const HERO_CREATED_MOCK = {
  name: 'any_name',
  power: 'any_power',
};

describe('Postgres Strategy', function () {
  this.timeout(Infinity);

  this.beforeAll(async () => {
    await context.connect();
  });

  it('Postgres connection', async () => {
    const result = await context.isConnected();
    assert.equal(result, true);
  });

  it('Postgres create', async () => {
    const result = await context.create(HERO_CREATED_MOCK);
    delete result.id;
    assert.deepEqual(result, HERO_CREATED_MOCK);
  });
});
