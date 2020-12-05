"use strict";

var Users = require('../models/users');

var _require = require('bcryptjs'),
    compare = _require.compare; // validação de usuario por meio  de middleware


function checkAllFields(body) {
  var keys = Object.keys(body);

  for (var _i = 0, _keys = keys; _i < _keys.length; _i++) {
    var key = _keys[_i];

    if (req.body[key] == "") {
      return {
        user: body,
        error: 'Por favor, preencha todos os campos.'
      };
    }
  }
}

module.exports = {
  show: function show(req, res, next) {
    var id, user;
    return regeneratorRuntime.async(function show$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            id = req.session.userId;
            _context.next = 3;
            return regeneratorRuntime.awrap(Users.findOne({
              where: {
                id: id
              }
            }));

          case 3:
            user = _context.sent;

            if (user) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", res.render('user/register', {
              error: "Usuário não encontrado!"
            }));

          case 6:
            req.user = user;
            next();

          case 8:
          case "end":
            return _context.stop();
        }
      }
    });
  },
  post: function post(req, res, next) {
    var fillAllFields, _req$body, email, cpf_cnpj, password, passwordRepeat, user;

    return regeneratorRuntime.async(function post$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            //please fill all fields
            fillAllFields = checkAllFields(req.body);

            if (!fillAllFields) {
              _context2.next = 3;
              break;
            }

            return _context2.abrupt("return", res.render('user/register', fillAllFields));

          case 3:
            //check if email and cpfncpj existes
            _req$body = req.body, email = _req$body.email, cpf_cnpj = _req$body.cpf_cnpj, password = _req$body.password, passwordRepeat = _req$body.passwordRepeat;
            cpf_cnpj = cpf_cnpj.replace(/\D/g, "");
            _context2.next = 7;
            return regeneratorRuntime.awrap(Users.findOne({
              where: {
                email: email
              },
              or: {
                cpf_cnpj: cpf_cnpj
              }
            }));

          case 7:
            user = _context2.sent;

            if (!user) {
              _context2.next = 10;
              break;
            }

            return _context2.abrupt("return", res.render('user/register', {
              //personalizando menssagens de erros
              user: req.body,
              error: "Usuário já Cadastrado."
            }));

          case 10:
            if (!(password != passwordRepeat)) {
              _context2.next = 12;
              break;
            }

            return _context2.abrupt("return", res.render('user/register', {
              //personalizando menssagens de erros
              user: req.body,
              error: "As Senhas não Consciden"
            }));

          case 12:
            //inportante chamar sempre o nex 
            // para avançar para continuar a execução da app
            next();

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    });
  },
  put: function put(req, res, next) {
    var fillAllFields, _req$body2, password, id, user, passed;

    return regeneratorRuntime.async(function put$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            //check all fields 
            fillAllFields = checkAllFields(req.body);

            if (!fillAllFields) {
              _context3.next = 3;
              break;
            }

            return _context3.abrupt("return", res.render('user/index', fillAllFields));

          case 3:
            //verificar a password e o id
            _req$body2 = req.body, password = _req$body2.password, id = _req$body2.id;

            if (password) {
              _context3.next = 6;
              break;
            }

            return _context3.abrupt("return", res.render('user/index', {
              user: req.body,
              error: "Coloque sua senha para actualizar o cadastro"
            }));

          case 6:
            _context3.next = 8;
            return regeneratorRuntime.awrap(Users.findOne({
              where: id
            }));

          case 8:
            user = _context3.sent;
            _context3.next = 11;
            return regeneratorRuntime.awrap(compare(password, user.password));

          case 11:
            passed = _context3.sent;

            if (passed) {
              _context3.next = 14;
              break;
            }

            return _context3.abrupt("return", res.render('user/index', {
              user: req.body,
              error: "Senha incorreta"
            }));

          case 14:
            req.user = user;
            next();

          case 16:
          case "end":
            return _context3.stop();
        }
      }
    });
  }
};