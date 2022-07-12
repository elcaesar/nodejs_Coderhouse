//const path = __dirname
const options = {
  client: 'sqlite3',
  connection: {
    filename: `./db/ecommerce.db`,
  },
  useNullAsDefault: true,
};

module.exports = options;