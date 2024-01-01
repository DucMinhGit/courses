const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const coursesSchema = new Schema({
    _id: { type: Number },
    name: { type: String, required: true },
    videoId: { type: String, required: true },
    level: { type: String },
    description: { type: String },
    slug: { type: String, slug: 'name', unique: true },
    image: { type: String }
}, {
    _id: false,
    timestamps: true
});
coursesSchema.plugin(AutoIncrement);
coursesSchema.query.sortable = function(req) {
    if (req.query.hasOwnProperty('_sort')) {
        const isValidType = ['asc', 'desc'].includes(req.query.type);
        return this.sort({
            [req.query.column]: isValidType ? req.query.type : 'desc'
        })
    }
    return this;
}

mongoose.plugin(slug);
coursesSchema.plugin(mongooseDelete, { 
    deletedAt: true,
    overrideMethods: 'all'
});

module.exports = mongoose.model('courses', coursesSchema);