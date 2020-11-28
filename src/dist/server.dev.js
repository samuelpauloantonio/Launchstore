"use strict";

var express = require("express");

var nunjucks = require("nunjucks");

var routes = require('./Routers');

var methodOverride = require('method-override');

var server = express();
server.use(express.urlencoded({
  extended: true
}));
server.use(express["static"]("public"));
server.use(express["static"]("src/lib"));
server.use(methodOverride('_method'));
server.use(routes);
server.set('view engine', 'njk');
nunjucks.configure('src/app/views', {
  express: server,
  autoescape: false,
  noCache: true
});
server.listen(2014, function () {
  console.log("servidor is running");
});