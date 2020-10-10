
const express  = require("express")
const nunjucks = require("nunjucks")
const methodOverride = require('method-override')
const routes = require('./Routes')


const server = express()


server.set("view engine", "njk")

nunjucks.configure("src/app/views", {
  express : server,
  autoescape:false, 
  noCache:true
})


server.use(express.urlencoded({ extended : true}))


server.use(methodOverride('_method'))

server.use(express.static("public"))
server.use(express.static("src/lib"))


server.use(routes)




server.listen(3002, function(){
  console.log("servidor is running")
})
