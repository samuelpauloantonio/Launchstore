async function post(req, res, next){
    const keys = Object.keys(req.body);

    for (let key of keys) {
      if (req.body[key] == "") {
        return res.send("preencha todos os campos");
      }
    }

    //verificao de imagens
    if (req.files.length == 0) {
      return res.send('Envie pelomenos uma foto',)
    }

    next()


}

async function put(req, res, next){

  const keys = Object.keys(req.body);

  for (let key of keys) {
    if (req.body[key] == "" && key != 'removed_files') {
      return res.send("Volte e preencha todos os campos");
    }
  }


  next()

 
 


}


module.exports = {
    post,
    put
}