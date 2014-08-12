var express = require('express');
var passport = require('passport');
var mongoose = require('mongoose');
var LocalStrategy = require('passport-local').Strategy;

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

var config = require('./server/config/config')[env];

require('./server/config/express')(app, config);

require('./server/config/mongoose')(config);

require('./server/config/routes')(app);

var User = mongoose.model('User');
passport.use(new LocalStrategy(
    function(username, passport, done){
        User.findOne({username: username}).exec(function(err, user){
            if(user){
                return done(null, user);
            }else{
                return done(null, false);
            }
        })
    }
));

passport.serializeUser(function(user, done){
    if(user){
        done(null, user._id);
    }
});

passport.deserializeUser(function(id, done){
    User.findOne({_id:id}).exec(function(err, user){
        if(user){
            return done(null, user);
        }else{
            return done(null, false);
        }
    })
});

var port = process.env.PORT || 8000;
app.listen(config.port);
console.log('Listening on port ' + config.port + '...');