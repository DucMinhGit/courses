const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const courses = new Schema({
    name: { type: String, required: true },
    videoId: { type: String, required: true },
    level: { type: String },
    description: { type: String },
    slug: { type: String, slug: 'name', unique: true },
    image: { type: String }
}, {
    timestamps: true
});

mongoose.plugin(slug);
courses.plugin(mongooseDelete, { 
    deletedAt: true,
    overrideMethods: 'all'
});

module.exports = mongoose.model('courses', courses);