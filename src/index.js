const MongoDBStrategy = require('./db/strategies/mongodb.strategy');
const ContextStrategy = require('./db/strategies/base/context.strategy');
const PostgresStrategy = require('./db/strategies/postgres.strategy');

const contextMongo = new ContextStrategy(new MongoDBStrategy());
contextMongo.create();

const contextPostgres = new ContextStrategy(new PostgresStrategy());
contextPostgres.create();
