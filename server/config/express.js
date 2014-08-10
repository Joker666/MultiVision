/**
 * Created by joker on 8/11/14.
 */
var express = require('express');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var path = require('path');
var stylus = require('stylus');

module.exports = function(app, config){
    app.use(favicon());
    app.set('views', config.rootPath + '/server/views');
    app.set('view engine', 'jade');
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded());
    app.use(cookieParser());
    app.use(stylus.middleware(path.join(config.rootPath, 'public')));
    app.use(express.static(path.join(config.rootPath, 'public')));
};
