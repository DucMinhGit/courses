const { multipleMongooseToObject } = require('../../util/mongoose');
const Courses = require('../models/Course');

class SiteController
{
    // [GET] /home
    async home(req, res, next) {
        await Courses.find({})
            .then(courses => {
                res.render('home', { 
                    courses: multipleMongooseToObject(courses)
                });
            })
            .catch(next);
    };

    // [GET] /search
    search(req, res) {
        res.render('search')
    }
}

module.exports = new SiteController;