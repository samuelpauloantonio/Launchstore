"use strict";

var express = require("express");

var nunjucks = require("nunjucks");

var methodOverride = require('method-override');

var routes = require('./Routes');

var server = express();
server.set("view engine", "njk");
nunjucks.configure("src/app/views", {
  express: server,
  autoescape: false,
  noCache: true
});
server.use(express.urlencoded({
  extended: true
}));
server.use(methodOverride('_method'));
server.use(express["static"]("public"));
server.use(express["static"]("src/lib"));
server.use(routes);
server.listen(2014, function () {
  console.log("servidor is running");
});