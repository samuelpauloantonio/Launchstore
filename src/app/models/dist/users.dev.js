"use strict";

var bancodeDados = require('../../config/BD_conection');

var _require = require("bcryptjs"),
    hash = _require.hash;

module.exports = {
  create: function create(data) {
    var query, passwordHash, values, results;
    return regeneratorRuntime.async(function create$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            query = "\n        INSERT INTO  users (\n          name,\n          email,\n          password,\n          cpf_cnpj, \n          cep,\n          address\n            \n        ) VALUES($1, $2, $3, $4, $5, $6)\n        RETURNING id\n      "; //hash de senha

            _context.next = 4;
            return regeneratorRuntime.awrap(hash(data.password, 8));

          case 4:
            passwordHash = _context.sent;
            values = [data.name, data.email, passwordHash, data.cpf_cnpj.replace(/\D/g, ""), data.cep.replace(/\D/g, ""), data.address];
            _context.next = 8;
            return regeneratorRuntime.awrap(bancodeDados.query(query, values));

          case 8:
            results = _context.sent;
            return _context.abrupt("return", results.rows[0].id);

          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](0);
            console.error(_context.t0);

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 12]]);
  },
  //check if email and cpfncpj existes || users
  findOne: function findOne(filters) {
    var query, results;
    return regeneratorRuntime.async(function findOne$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            query = "SELECT * FROM  users";
            Object.keys(filters).map(function (key) {
              //where || or 
              query = "".concat(query, "\n            ").concat(key, "\n           ");
              Object.keys(filters[key]).map(function (field) {
                query = "".concat(query, " ").concat(field, " = '").concat(filters[key][field], "'");
              });
            });
            _context2.next = 4;
            return regeneratorRuntime.awrap(bancodeDados.query(query));

          case 4:
            results = _context2.sent;
            return _context2.abrupt("return", results.rows[0]);

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    });
  },
  async: async
};