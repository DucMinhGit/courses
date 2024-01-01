const Course = require('../models/Course');
const {multipleMongooseToObject} = require('../../util/mongoose');

class MeController 
{
    // [GET] /me/stored/courses
    async storedCourses(req, res, next) {
        let courseQuery = Course.find({});

        await Promise.all([courseQuery, Course.countDocumentsWithDeleted({deleted:true})])
            .then(([courses, deletedCount]) => res.render('me/stored-courses', {
                deletedCount,
                courses: multipleMongooseToObject(courses)
            }))
            .catch(next);
    }

    // [GET] /me/trash/courses
    async trashCourses(req, res, next) {
        await Course.findWithDeleted({deleted:true}) 
            .then((course) => res.render('me/trash-courses', {
                courses: multipleMongooseToObject(course)
            }))
            .catch(next);
    }
}

module.exports = new MeController;