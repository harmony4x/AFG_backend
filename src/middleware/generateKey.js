
const crypto = require('crypto');

const key1 = crypto.randomBytes(32).toString('hex');
const key2 = crypto.randomBytes(32).toString('hex');
const key3 = crypto.randomBytes(4).toString('hex');
console.log(key1)
console.log(key2)
console.log(key3)

