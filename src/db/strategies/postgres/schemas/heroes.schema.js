const Sequelize = require('sequelize');

const heroesSchema = {
  name: 'heroes',
  schema: {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    power: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  options: {
    tableName: 'hero',
    timestamps: false
  }
};

module.exports = heroesSchema;
