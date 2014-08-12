var mongoose = require('mongoose');

module.exports = function(config){
    mongoose.connect(config.db);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error...'));
    db.once('open', function callback() {
        console.log('multivision db opened');
    });

    var userSchema = mongoose.Schema({
        firstname: String,
        lastname: String,
        username: String
    });

    var User = mongoose.model('User', userSchema);

    User.find({}).exec(function(err, collection){
        if(collection.length == 0){
            User.create({firstname:'John', lastname:'Doe', username:'johndoe'});
            User.create({firstname:'Jina', lastname:'Doe', username:'jinadoe'});
            User.create({firstname:'Jane', lastname:'Doe', username:'janedoe'});
        }
    });

};