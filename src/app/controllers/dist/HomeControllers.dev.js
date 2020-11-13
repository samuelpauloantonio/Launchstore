"use strict";

var Product = require("../models/product");

var _require = require('../../lib/utils'),
    formatPrice = _require.formatPrice;

module.exports = {
  index: function index(req, res) {
    var filter, getImage, results, products, productPromise, lastAdd, _getImage, _results, _products, _productPromise, _lastAdd;

    return regeneratorRuntime.async(function index$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            filter = req.query.filter;

            if (!filter) {
              _context5.next = 14;
              break;
            }

            getImage = function getImage(productID) {
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

            _context5.next = 5;
            return regeneratorRuntime.awrap(Product.filterBy(filter));

          case 5:
            results = _context5.sent;
            products = results.rows;
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
            });
            _context5.next = 10;
            return regeneratorRuntime.awrap(Promise.all(productPromise));

          case 10:
            lastAdd = _context5.sent;
            return _context5.abrupt("return", res.render('home/index', {
              products: lastAdd,
              filter: filter
            }));

          case 14:
            _getImage = function _getImage(productID) {
              var results, files;
              return regeneratorRuntime.async(function _getImage$(_context3) {
                while (1) {
                  switch (_context3.prev = _context3.next) {
                    case 0:
                      _context3.next = 2;
                      return regeneratorRuntime.awrap(Product.files(productID));

                    case 2:
                      results = _context3.sent;
                      files = results.rows.map(function (file) {
                        return "".concat(req.protocol, "://").concat(req.headers.host).concat(file.path.replace("public", ""));
                      });
                      return _context3.abrupt("return", files[0]);

                    case 5:
                    case "end":
                      return _context3.stop();
                  }
                }
              });
            };

            _context5.next = 17;
            return regeneratorRuntime.awrap(Product.all());

          case 17:
            _results = _context5.sent;
            _products = _results.rows;
            if (!_products) res.send("Product Not-found !");
            _productPromise = _products.map(function _callee2(product) {
              return regeneratorRuntime.async(function _callee2$(_context4) {
                while (1) {
                  switch (_context4.prev = _context4.next) {
                    case 0:
                      _context4.next = 2;
                      return regeneratorRuntime.awrap(_getImage(product.id));

                    case 2:
                      product.img = _context4.sent;
                      product.oldPrice = formatPrice(product.old_price);
                      product.price = formatPrice(product.price);
                      return _context4.abrupt("return", product);

                    case 6:
                    case "end":
                      return _context4.stop();
                  }
                }
              });
            }).filter(function (product, index) {
              return index > 2 ? false : true;
            });
            _context5.next = 23;
            return regeneratorRuntime.awrap(Promise.all(_productPromise));

          case 23:
            _lastAdd = _context5.sent;
            return _context5.abrupt("return", res.render('home/index', {
              products: _lastAdd
            }));

          case 25:
          case "end":
            return _context5.stop();
        }
      }
    });
  }
};