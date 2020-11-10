"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var category = require("../models/category");

var Product = require("../models/product");

var _require = require('../../lib/utils'),
    formatPrice = _require.formatPrice,
    date = _require.date;

var File = require('../models/File');

module.exports = {
  create: function create(req, res) {
    //Pegar categorias
    category.all().then(function (results) {
      var categories = results.rows;
      return res.render("products/create.njk", {
        categories: categories
      });
    })["catch"](function (err) {
      throw new Error(err);
    });
  },
  post: function post(req, res) {
    var keys, _i, _keys, key, results, product_id, filesPromise;

    return regeneratorRuntime.async(function post$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            keys = Object.keys(req.body);
            _i = 0, _keys = keys;

          case 2:
            if (!(_i < _keys.length)) {
              _context.next = 9;
              break;
            }

            key = _keys[_i];

            if (!(req.body[key] == "")) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", res.send("please fill all fields"));

          case 6:
            _i++;
            _context.next = 2;
            break;

          case 9:
            if (!(req.files.length == 0)) {
              _context.next = 11;
              break;
            }

            return _context.abrupt("return", res.send('Please, send at least one image'));

          case 11:
            _context.next = 13;
            return regeneratorRuntime.awrap(Product.create(req.body));

          case 13:
            results = _context.sent;
            product_id = results.rows[0].id;
            filesPromise = req.files.map(function (file) {
              return File.create(_objectSpread({}, file, {
                product_id: product_id
              }));
            });
            _context.next = 18;
            return regeneratorRuntime.awrap(Promise.all(filesPromise));

          case 18:
            return _context.abrupt("return", res.redirect("/products/".concat(product_id, "/edit")));

          case 19:
          case "end":
            return _context.stop();
        }
      }
    });
  },
  edit: function edit(req, res) {
    var results, product, categories, files;
    return regeneratorRuntime.async(function edit$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return regeneratorRuntime.awrap(Product.find(req.params.id));

          case 2:
            results = _context2.sent;
            product = results.rows[0];

            if (product) {
              _context2.next = 6;
              break;
            }

            return _context2.abrupt("return", res.send("Product Not found"));

          case 6:
            //Formatando Price
            product.price = formatPrice(product.price);
            product.old_price = formatPrice(product.old_price); //get categories

            _context2.next = 10;
            return regeneratorRuntime.awrap(category.all());

          case 10:
            results = _context2.sent;
            categories = results.rows; //get images

            _context2.next = 14;
            return regeneratorRuntime.awrap(Product.files(product.id));

          case 14:
            results = _context2.sent;
            files = results.rows;
            files = files.map(function (file) {
              return _objectSpread({}, file, {
                src: "".concat(req.protocol, "://").concat(req.headers.host).concat(file.path.replace("public", ""))
              });
            });
            return _context2.abrupt("return", res.render("products/edit", {
              product: product,
              categories: categories,
              files: files
            }));

          case 18:
          case "end":
            return _context2.stop();
        }
      }
    });
  },
  show: function show(req, res) {
    var results, product, _date, day, hour, minutes, month, year, files;

    return regeneratorRuntime.async(function show$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return regeneratorRuntime.awrap(Product.find(req.params.id));

          case 2:
            results = _context3.sent;
            product = results.rows[0];

            if (product) {
              _context3.next = 6;
              break;
            }

            return _context3.abrupt("return", res.send('Product Not-found'));

          case 6:
            _date = date(product.updated_at), day = _date.day, hour = _date.hour, minutes = _date.minutes, month = _date.month, year = _date.year;
            product.published = {
              day: "".concat(day, "/").concat(month, "/").concat(year),
              hour: "".concat(hour, "h:").concat(minutes)
            };
            product.old_price = formatPrice(product.old_price);
            product.price = formatPrice(product.price);
            _context3.next = 12;
            return regeneratorRuntime.awrap(Product.files(product.id));

          case 12:
            results = _context3.sent;
            files = results.rows.map(function (file) {
              return _objectSpread({}, file, {
                src: "".concat(req.protocol, "://").concat(req.headers.host).concat(file.path.replace("public", ""))
              });
            });
            return _context3.abrupt("return", res.render('products/show', {
              product: product,
              files: files
            }));

          case 15:
          case "end":
            return _context3.stop();
        }
      }
    });
  },
  put: function put(req, res) {
    var keys, _i2, _keys2, key, newFilePromise, removedFiles, lastIndex, removedFilesPromise, oldProduct;

    return regeneratorRuntime.async(function put$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            keys = Object.keys(req.body);
            _i2 = 0, _keys2 = keys;

          case 2:
            if (!(_i2 < _keys2.length)) {
              _context4.next = 9;
              break;
            }

            key = _keys2[_i2];

            if (!(req.body[key] == "" && key != "removed_files")) {
              _context4.next = 6;
              break;
            }

            return _context4.abrupt("return", res.send("please fill all fields" + " " + key));

          case 6:
            _i2++;
            _context4.next = 2;
            break;

          case 9:
            if (!(req.files != 0)) {
              _context4.next = 13;
              break;
            }

            newFilePromise = req.files.map(function (file) {
              return File.create(_objectSpread({}, file, {
                product_id: req.body.id
              }));
            });
            _context4.next = 13;
            return regeneratorRuntime.awrap(Promise.all(newFilePromise));

          case 13:
            if (!req.body.removed_files) {
              _context4.next = 20;
              break;
            }

            removedFiles = req.body.removed_files.split(","); //[1,2,3,]

            lastIndex = removedFiles.length - 1;
            removedFiles.splice(lastIndex, 1); //[1,2,3]

            removedFilesPromise = removedFiles.map(function (id) {
              return File.deleteImage(id);
            });
            _context4.next = 20;
            return regeneratorRuntime.awrap(Promise.all(removedFilesPromise));

          case 20:
            req.body.price = req.body.price.replace(/\D/g, "");

            if (!(req.body.old_price != req.body.price)) {
              _context4.next = 29;
              break;
            }

            _context4.next = 24;
            return regeneratorRuntime.awrap(Product.find(req.body.id));

          case 24:
            oldProduct = _context4.sent;
            req.body.old_price = oldProduct.rows[0].price;
            _context4.next = 28;
            return regeneratorRuntime.awrap(Product.update(req.body));

          case 28:
            return _context4.abrupt("return", res.redirect("/products/".concat(req.body.id, "/edit")));

          case 29:
          case "end":
            return _context4.stop();
        }
      }
    });
  },
  "delete": function _delete(req, res) {
    return regeneratorRuntime.async(function _delete$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return regeneratorRuntime.awrap(Product["delete"](req.body.id));

          case 2:
            return _context5.abrupt("return", res.redirect('/products/create'));

          case 3:
          case "end":
            return _context5.stop();
        }
      }
    });
  }
};