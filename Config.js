const readConfig = require('read-config');
const config = readConfig('config.json');

const user = config.database["user"];
const password = config.database["password"];
const port = config.database["port"];
const databaseName = config.database["databaseName"];

module.exports = {
    user, password, port, databaseName
}