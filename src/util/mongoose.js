module.exports = {
    multipleMongooseToObject: function (mongoosesArrays) {
        return mongoosesArrays.map(mongoose => mongoose.toObject());
    },
    mongooseToObject: function (mongoose) {
        return mongoose ? mongoose.toObject() : mongoose;
    }
}