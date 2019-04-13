import Restify from 'restify'
import Mongoose from 'mongoose'
import rjwt from 'restify-jwt-community'
import Config from './config'
import customers from './routes/customers'
import users from './routes/users'

const server = Restify.createServer();
const log = console.log

//Adding body Parse middleware to the server
server.use(Restify.plugins.bodyParser())

//Protect route unless it's auth routes
server.use(rjwt({
    secret: Config.JWT_SECRET
}).unless({ path: ['/auth', '/register'] }))

server.listen(Config.PORT, err => {
    err ? log(`An error has occurred trying to connect to port: ${config.PORT}`) : Mongoose.connect(Config.URI, { useNewUrlParser: true })
});

const db = Mongoose.connection;

db.on('error', err => log(`Error has occurred when trying to connect to the DB ${err}`));

db.on('open', () => {
    customers(server);
    users(server);
    log(`Server started on port: ${Config.PORT}`);
})
