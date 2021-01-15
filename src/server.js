
const express  = require("express")
const nunjucks = require("nunjucks")
const routes = require('./Routers')
const methodOverride = require('method-override')
const session = require('./config/session')



const server = express()

server.use(session)

//variavel global do express para o nunjucks
server.use((req, res, next) => {

  server.locals.session = req.session

  next()
})



server.use(express.urlencoded({ extended : true}))
server.use(express.static("public"))
server.use(express.static("src/lib/scripts"))
server.use(methodOverride('_method'))
server.use(routes)


server.set('view engine', 'njk')

nunjucks.configure('src/app/views', {
  express : server,
  autoescape:false, 
  noCache:true 
})


server.listen(3000, function(){
  console.log("servidor is running")
})
 