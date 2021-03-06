var passport = require('passport');
var mongoose = require('mongoose');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function(){
    var User = mongoose.model('User');
    passport.use(new LocalStrategy(
        function(username, password, done){
            User.findOne({username: username}).exec(function(err, user){
                if(user && user.authenticateByPasswordMatching(password)){
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
}
