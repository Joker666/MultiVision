var mongoose = require('mongoose');
var encrypt = require('../utilities/encryption');

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
        username: String,
        salt: String,
        hashed_pwd: String,
        roles: [String]
    });

    userSchema.methods = {
        authenticate: function(passwordToMatch){
            return encrypt.hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
        }
    };

    var User = mongoose.model('User', userSchema);

    User.find({}).exec(function(err, collection){
        if(collection.length == 0){
            var salt, hash;
            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt, 'john');
            User.create({firstname:'John', lastname:'Doe', username:'john', salt:salt, hashed_pwd:hash, roles: ['admin']});

            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt, 'jina');
            User.create({firstname:'Jina', lastname:'Doe', username:'jina', salt:salt, hashed_pwd:hash, roles: []});

            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt, 'jane');
            User.create({firstname:'Jane', lastname:'Doe', username:'jane', salt:salt, hashed_pwd:hash});
        }
    });

};