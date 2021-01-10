const { unlinkSync } = require("fs");
const { hash } = require('bcryptjs')

const Users = require("../models/users");
const Products  = require("../models/product"); 
const LoadProductsServices = require('../services/LoadProductService')

const { formatCep, formatCpfCnpj } = require("../../lib/utils");
const LoadService = require("../services/LoadProductService");

module.exports = {
  registerForm(req, res) {
    return res.render("user/register.njk");
  },

  async show(req, res) {
    const { user } = req;

    user.cpf_cnpj = formatCpfCnpj(user.cpf_cnpj);
    user.cep = formatCep(user.cep);

    return res.render("user/index.njk", { user });
  },

  async post(req, res) {
    // validação de usuario por meio  de middleware == tem um
    // Middleware no Validator

    try {
      let { name, email, password, cpf_cnpj, cep, address } = req.body;

      cpf_cnpj = cpf_cnpj.replace(/\D/g, "");
      cep.replace = cep.replace(/\D/g, "");
      const passwordHash = await hash(password, 8);

      const userId = await Users.create({
        name,
        email,
        password : passwordHash,
        cpf_cnpj, 
        cep, 
        address,
      });

      //controlo de sessao do usuario
      req.session.userId = userId;

      return res.redirect("/users");
    } catch (error) {
      console.error(error);
    }
  },

  async put(req, res) {
    try {
      const { user } = req;

      let { name, email, cpf_cnpj, cep, address } = req.body;

      cpf_cnpj = cpf_cnpj.replace(/\D/g, "");
      cep = cep.replace(/\D/g, "");

      await Users.update(user.id, {
        name,
        email,
        cpf_cnpj,
        cep,
        address,
      });

      return res.render("user/index", {
        user: req.body,
        success: "Conta actualizada com sucesso",
      });
    } catch (err) {
      console.error(err);
    }
  },

  async delete(req, res) {
    try {
      //pegar todos os productos  de apenas um usuário

      const products = await Products.findAll({
        where: { user_id: req.body.id },
      });

      // dos produtos pegar todas as imagens

      const allFilesPromise = products.map((product) =>
        Products.files(product.id)
      );

      let promiseResults = await Promise.all(allFilesPromise);

      // rodar a remoção do usuário

      await Users.delete(req.body.id);
      req.session.destroy();
      //remover as imagens da pasta public

      promiseResults.map((files) => {
        files.map((file) => unlinkSync(file.path));
      });

      return res.render("session/login.njk", {
        success: "conta deletada com sucesso.!",
      });
    } catch (err) {
      console.error(err);

      return res.render("user/index.njk", {
        error: "Aconteceu algun erro ao deletar  o usuário",
      });
    }
  },


  async ads(req, res){

    const  products = await LoadProductsServices.load('products', {
      where : { user_id : req.session.userId }
    })

    console.log(products)

    return res.render('user/ads', { products })
    
  }
};
