const assert = require('assert');
const PostgresStrategy = require('../../../src/db/strategies/postgres.strategy');
const Context = require('../../../src/db/strategies/base/context.strategy');

const context = new Context(new PostgresStrategy());
const HERO_CREATED_MOCK = {
  name: 'any_name',
  power: 'any_power',
};

const HERO_UPDATE_MOCK = {
  name: 'hero_to_update',
  power: 'any_power',
};

const HERO_DELETE_MOCK = {
  name: 'hero_to_delete',
  power: 'any_power',
};

describe('Postgres Strategy', function () {
  this.beforeAll(async () => {
    await context.connect();
    await context.delete();
    await context.create(HERO_UPDATE_MOCK);
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

  it('Postgres read', async () => {
    const [result] = await context.read({ name: HERO_CREATED_MOCK.name });
    delete result.id;
    assert.deepEqual(result, HERO_CREATED_MOCK);
  });

  it('Postgres update', async () => {
    const [result] = await context.read({ name: HERO_UPDATE_MOCK.name });
    const id = result.id;
    result.name = 'new_name';
    await context.update(id, result);
    const [updatedResult] = await context.read({ id });
    delete updatedResult.id;
    assert.deepEqual(updatedResult, result);
  });

  it('Postgres delete', async () => {
    const heroToDelete = await context.create(HERO_DELETE_MOCK);
    await context.delete(heroToDelete.id);
    const [deletedResult] = await context.read({ id: heroToDelete.id });
    assert.deepEqual(deletedResult, undefined);
  });
});
