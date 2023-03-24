const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: 'string',
    email: 'string',
    city: 'string',

});
const User = mongoose.model('user', schema);

module.exports = User;