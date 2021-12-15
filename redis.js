const redis = require('redis')
const redisPort = 6379
const client = redis.createClient(redisPort);
// client.on("error", (err) => {
//   console.log(err);
// });
client.on('connect', () => {
  console.log(`Redis connected on port`);
});

client.connect();

module.exports = client

// redis-client.js
// var redis = require('redis');
// const redisPort = 6379
// module.exports = redis.createClient(redisPort);