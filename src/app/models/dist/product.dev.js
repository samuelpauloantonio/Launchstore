"use strict";

var bancodeDados = require('../../config/BD_conection');

var fs = require('fs');

module.exports = {
  all: function all() {
    return bancodeDados.query("\n          SELECT * FROM products \n          ORDER BY updated_at DESC\n        ");
  },
  filterBy: function filterBy(filter) {
    try {
      return bancodeDados.query("\n      SELECT products.*\n      FROM products \n      WHERE products.name ILIKE '%".concat(filter, "%'\n      ORDER BY name ASC\n    "));
    } catch (error) {
      console.error(error);
    }
  },
  create: function create(dados) {
    var query = "\n          INSERT INTO  products(\n\n            category_id,\n            user_id,\n            name,\n            description ,\n            old_price,\n            price,\n            quantity,\n            status\n            \n                      \n          ) VALUES($1, $2, $3, $4, $5, $6, $7, $8)\n          RETURNING id\n        ";
    dados.price = dados.price.replace(/\D/g, "");
    var values = [dados.category_id, dados.user_id || 1, dados.name, dados.description, dados.old_price || dados.price, dados.price, dados.quantity, dados.status || 1];
    return bancodeDados.query(query, values);
  },
  find: function find(id) {
    return bancodeDados.query("SELECT * FROM products WHERE id  = $1", [id]);
  },
  update: function update(dados) {
    var query = "\n          UPDATE products SET \n\n            category_id = ($1),\n            user_id  = ($2),\n            name  = ($3),\n            description   = ($4) ,\n            old_price  = ($5),\n            price  = ($6),\n            quantity  = ($7),\n            status  = ($8)\n          WHERE id = $9\n        ";
    var values = [dados.category_id, dados.user_id, dados.name, dados.description, dados.old_price, dados.price, dados.quantity, dados.status, dados.id];
    return bancodeDados.query(query, values);
  },
  "delete": function _delete(id) {
    return bancodeDados.query("DELETE FROM products WHERE id = $1", [id]);
  },
  files: function files(id) {
    return bancodeDados.query("\n          SELECT * FROM files WHERE product_id = $1", [id]);
  },
  search: function search(params) {
    var filter = params.filter,
        category = params.category;
    var query = "",
        filterQuery = "WHERE";

    if (category) {
      filterQuery = "".concat(filterQuery, "\n              products.category_id = ").concat(category, "\n              AND\n              ");
    }

    filterQuery = "".concat(filterQuery, "\n            products.name ILIKE '%").concat(filter, "%'\n            OR products.description ILIKE '%").concat(filter, "%'\n            ");
    query = "\n              SELECT products.*,\n              categories.name AS category_name \n              FROM products \n              LEFT JOIN categories ON(categories.id = products.category_id)\n              ".concat(filterQuery, "\n          \n            ");
    return bancodeDados.query(query);
  }
};