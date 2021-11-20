import express from 'express'
import {PORT, REDIS_PORT, REDIS_HOST} from './config/variables'
import cors from 'cors'
import http from 'http'
import socketIO from 'socket.io';
import cron from 'node-cron';
import redis from 'redis';
import storeData from './scheduler';

const app = express()
const server = http.createServer(app)
const io = socketIO(server, {
  transports:['polling'],
  cors:{
    cors: {
      origin: "http://localhost:3000"
    }
  }
})

io.on('connection', (socket) => {
  console.log('A user is connected');

  socket.on('message', (message) => {
    console.log(`message from ${socket.id} : ${message}`);
  })

  const interval = setInterval(() => {
    redisClient.scan(0, 'MATCH', 'Test::*', 'COUNT', '100', (err, reply) => {
        const all_keys = reply[1];
        redisClient.mget(all_keys, (err, reply) => {
          const data = [];
          for (let item of reply) {
            data.push(JSON.parse(item));
          }
          io.emit('items-added', data);
        })
    })
  }, 10 * 1000);

  socket.on('disconnect', () => {
    console.log(`socket ${socket.id} disconnected`);
  })
})

export {io};

app.use(express.json())
app.use(cors())

const redisClient = redis.createClient(REDIS_PORT, REDIS_HOST);
redisClient.on('connect', () => {
  console.log('Redis Server connected!');
});

cron.schedule('*/5 * * * * *', () => {
  storeData(redisClient);
}, {});

app.get('/', (req,res) => {
  res.send('Hello')
})

server.listen(PORT, () => {
  console.log(`Server up and running on port ${PORT}`);
})