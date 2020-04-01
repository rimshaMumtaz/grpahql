var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/** MONGO DB SETUP **/
mongoose.connect('mongodb://localhost/dliveTvUsers', { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

var usersSchema = new Schema({
    username: String

}, {collection: 'users'});

module.exports = mongoose.model('users', usersSchema);
