var mongoose = require('mongoose');
var crypto = require('crypto');

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
            return hashedPwd(this.salt, passwordToMatch) === this.hashed_pwd;
        }
    };

    var User = mongoose.model('User', userSchema);

    User.find({}).exec(function(err, collection){
        if(collection.length == 0){
            var salt, hash;
            salt = createSalt();
            hash = hashedPwd(salt, 'john');
            User.create({firstname:'John', lastname:'Doe', username:'john', salt:salt, hashed_pwd:hash, roles: ['admin']});

            salt = createSalt();
            hash = hashedPwd(salt, 'jina');
            User.create({firstname:'Jina', lastname:'Doe', username:'jina', salt:salt, hashed_pwd:hash, roles: []});

            salt = createSalt();
            hash = hashedPwd(salt, 'jane');
            User.create({firstname:'Jane', lastname:'Doe', username:'jane', salt:salt, hashed_pwd:hash});
        }
    });

};


// Hashing
function createSalt(){
    return crypto.randomBytes(128).toString('base64');
}

function hashedPwd(salt, pwd){
    var hmac = crypto.createHmac('sha1', salt);
    return hmac.update(pwd).digest('hex');
}