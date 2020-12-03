const express = require('express');

const middlewares = require('./middlewares/user-middlewares')

const usersRouter = require('./users/userRouter')
const postsRouter = require('./posts/postRouter')

const server = express();

server.use(middlewares.logger)
server.use(express.json())

server.use('/api/posts', postsRouter)
server.use('/api/users', usersRouter)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
