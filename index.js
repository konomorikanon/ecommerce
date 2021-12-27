require('dotenv').config();
// el dotenv lleva un .config
const Server = require('./models/server')

const server = new Server();

server.listen()
