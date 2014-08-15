var mongoose = require('mongoose');
var encrypt = require('../utilities/encryption');

var userSchema = mongoose.Schema({
    firstname: {type:String, required:"{PATH} is required madafaqa"},
    lastname: {type:String, required:"{PATH} is required madafaqa"},
    username: {
        type:String,
        required:"{PATH} is required madafaqa",
        unique:true
    },
    salt: {type:String, required:"{PATH} is required madafaqa"},
    hashed_pwd: {type:String, required:"{PATH} is required madafaqa"},
    roles: [String]
});

userSchema.methods = {
    authenticateByPasswordMatching: function(passwordToMatch){
        return encrypt.hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
    },
    hasRole: function(role){
        return this.roles.indexOf(role) > -1;
    }
};

var User = mongoose.model('User', userSchema);

function createDefaultUsers(){
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
}

exports.createDefaultUsers = createDefaultUsers;