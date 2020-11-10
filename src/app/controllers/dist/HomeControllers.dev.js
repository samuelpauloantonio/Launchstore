"use strict";

var Product = require("../models/product");

var _require = require('../../lib/utils'),
    formatPrice = _require.formatPrice;

module.exports = {
  index: function index(req, res) {
    var results, products, getImage, productPromise, lastAdd;
    return regeneratorRuntime.async(function index$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            getImage = function _ref(productID) {
              var results, files;
              return regeneratorRuntime.async(function getImage$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _context.next = 2;
                      return regeneratorRuntime.awrap(Product.files(productID));

                    case 2:
                      results = _context.sent;
                      files = results.rows.map(function (file) {
                        return "".concat(req.protocol, "://").concat(req.headers.host).concat(file.path.replace("public", ""));
                      });
                      return _context.abrupt("return", files[0]);

                    case 5:
                    case "end":
                      return _context.stop();
                  }
                }
              });
            };

            _context3.next = 3;
            return regeneratorRuntime.awrap(Product.all());

          case 3:
            results = _context3.sent;
            products = results.rows;
            if (!products) res.send("Product Not-found !");
            productPromise = products.map(function _callee(product) {
              return regeneratorRuntime.async(function _callee$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      _context2.next = 2;
                      return regeneratorRuntime.awrap(getImage(product.id));

                    case 2:
                      product.img = _context2.sent;
                      product.oldPrice = formatPrice(product.old_price);
                      product.price = formatPrice(product.price);
                      return _context2.abrupt("return", product);

                    case 6:
                    case "end":
                      return _context2.stop();
                  }
                }
              });
            }).filter(function (product, index) {
              return index > 2 ? false : true;
            });
            _context3.next = 9;
            return regeneratorRuntime.awrap(Promise.all(productPromise));

          case 9:
            lastAdd = _context3.sent;
            return _context3.abrupt("return", res.render('home/index', {
              products: lastAdd
            }));

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    });
  }
};