var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/** MONGO DB SETUP **/
mongoose.connect('mongodb://localhost/dliveTvUsers', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

var usersSchema = new Schema({
    username: {type: String, unique: true}

}, {collection: 'users'});

usersSchema.path('username').index({unique: true});
module.exports = mongoose.model('users', usersSchema);
