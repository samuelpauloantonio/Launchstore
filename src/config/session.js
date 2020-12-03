const session = require('express-session')
const connectPgSimple = require('connect-pg-simple')(session)
const bancodeDados = require('./BD_conection')


module.exports = session({
    store : new connectPgSimple({
        pool : bancodeDados
    }),

    secret : '51053455',
    resave : false,
    saveUninitialized : false,
    cookie : {
        maxAge : 30 * 24 * 60 * 60 * 1000
    }
})