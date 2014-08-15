var mongoose = require('mongoose');
var Course = mongoose.model('Course');

exports.getCourses = function(req, res){
    Course.find({}).exec(function(err, collection){
        res.send(collection);
    });
};