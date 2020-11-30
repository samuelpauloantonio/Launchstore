"use strict";

var e = require("express");

module.exports = {
  registerForm: function registerForm(req, res) {
    return res.render('user/register.njk');
  },
  post: function post(req, res) {
    var keys, _i, _keys, key, _req$body, email, cpf_cnpj, user;

    return regeneratorRuntime.async(function post$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            //please fill all fields
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
            // check if email and cpfncpj existes
            _req$body = req.body, email = _req$body.email, cpf_cnpj = _req$body.cpf_cnpj;
            _context.next = 12;
            return regeneratorRuntime.awrap(Users.findOne({
              where: {
                email: email
              },
              or: {
                cpf_cnpj: cpf_cnpj
              }
            }));

          case 12:
            user = _context.sent;

          case 13:
          case "end":
            return _context.stop();
        }
      }
    });
  }
};