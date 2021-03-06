var auth = require('./auth');
var users = require('../controllers/users');
var courses = require('../controllers/courses');
var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = function(app){

    app.get('/api/users', auth.requiresRole('admin'), users.getUsers);
    app.post('/api/users', users.createUser);
    app.put('/api/users', users.updateUser);

    app.get('/api/courses', courses.getCourses);

    app.get('/partials/*', function(req, res) {
        res.render('../../public/app/' + req.params[0]);
    });
    app.post('/login', auth.authenticate);
    app.post('/logout', auth.logout);

    app.all('/api/*', function(req, res){
        res.send(404);
    });

    app.get('*', function(req, res) {
        res.render('index', {
            bootStrapUser: req.user
        });
    });
};
