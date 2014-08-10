var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
    development: {
        db: 'mongodb://localhost/multivision',
        rootPath: rootPath,
        port: process.env.PORT || 8000
    },
    production: {
        db: 'mongodb://joker:multivision@ds029960.mongolab.com:29960/multivision',
        rootPath: rootPath,
        port: process.env.PORT || 80
    }
};
