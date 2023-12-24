const mongoose = require('mongoose');
var slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const Schema = mongoose.Schema;

const Course = new Schema({
    name: {type: String},
    description: {type: String},
    cover: {type: String},
    slug: { type: String, slug: 'name', unique: true },
}, {
    timestamps: true
});

module.exports = mongoose.model('Course', Course);

