const oEnvironment = require('../constants/Environment.js');

module.exports = function (oApp) {
//   // Routes with authentication
//   oApp.use(`${oEnvironment.URL_API}admin`, AuthMiddleware, require('./Users.js'));

//   // Routes without authentication
//   oApp.use(`${oEnvironment.URL_API}admin`, require('./Users.js'));
   oApp.use(`${oEnvironment.URL_API}chatbot`, require('./Palm.js'));
};