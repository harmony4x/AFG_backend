const redis = require('redis');


const client = redis.createClient({
    port: 6379,
    host: 'localhost',
    legacyMode: true,

})
client.connect().catch(console.error)


client.ping(async (err, pong) => {

    console.log(pong);
})
client.on('error', err => console.log('Redis Client Error', err));

client.on('connect', err => console.log('connected'));

client.on('ready', err => console.log('ready'));




module.exports = client;