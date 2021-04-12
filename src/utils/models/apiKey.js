const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    token: String,
    scopes: [String],
})

module.exports = model('apiKeys', userSchema);