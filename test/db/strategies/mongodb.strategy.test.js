const assert = require('assert');
const MongoDBStrategy = require('../../../src/db/strategies/mongodb/mongodb.strategy');
const Context = require('../../../src/db/strategies/base/context.strategy');
const HeroesSchema = require('../../../src/db/strategies/mongodb/schemas/heroes.schema');
let context = {};

const HERO_CREATED_MOCK = {
  name: 'any_name',
  power: 'any_power',
};

const HERO_UPDATE_MOCK = {
  name: 'hero_to_update',
  power: 'any_power',
};

let HERO_UPDATE_MOCK_ID = '';

describe('MongoDB Strategy', function () {
  this.beforeAll(async () => {
    const connection = MongoDBStrategy.connect();
    context = new Context(new MongoDBStrategy(connection, HeroesSchema));
    await context.delete();
    const result = await context.create(HERO_UPDATE_MOCK);
    HERO_UPDATE_MOCK_ID = result._id;
  });

  it('MongoDB connection', async () => {
    const result = await context.isConnected();
    assert.deepEqual(result, `Connected`);
  });

  it(`MongoDB create`, async () => {
    const { name, power } = await context.create(HERO_CREATED_MOCK);
    assert.deepEqual({ name, power }, HERO_CREATED_MOCK);
  });

  it(`MongoDB read`, async () => {
    const [{ name, power }] = await context.read({ name: HERO_CREATED_MOCK.name });
    assert.deepEqual({ name, power }, HERO_CREATED_MOCK);
  });

  it(`MongoDB update`, async () => {
    const result = await context.update(HERO_UPDATE_MOCK_ID, {
      power: 'updated_power'
    });
    assert.deepEqual(result.nModified, 1);
  });

  it(`MongoDB delete`, async () => {
    const result = await context.delete(HERO_UPDATE_MOCK_ID);
    assert.deepEqual(result.n, 1);
  });
});
