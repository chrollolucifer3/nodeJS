const mongoose = require('mongoose');
var slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const Schema = mongoose.Schema;

const User = new Schema({
    username: {type: String, required: true, unique: true}, 
    password: {type: String},
    fullname: {type: String},
    email: {type: String, required: true, unique: true},
    salt: {type: String},
    hpass: {type: String},
    role: {type: String},
    slug: { type: String, slug: 'username', unique: true },
}, {
    timestamps: true
});

module.exports = mongoose.model('User', User);


