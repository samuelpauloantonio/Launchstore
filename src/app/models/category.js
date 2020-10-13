const bancodeDados = require('../../config/BD_conection')

module.exports = {
    all(){
        return bancodeDados.query(`
            SELECT * FROM categories
        `)
    }
}

