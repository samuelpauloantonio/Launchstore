const Base = require('./Base')

Base.init({table : " files "})

const files  = {
    ...Base
}


module.exports = files



// async deleteImage(id){

      //   try{
  
      //     const results = await bancodeDados.query(`SELECT * FROM files WHERE id = $1 `, [id])
  
      //     const file = results.rows[0]
  
      //     fs.unlinkSync(file.path)
  
      //     return bancodeDados.query(`
      //     DELETE FROM files WHERE id = $1
      //     `, [id])
  
  
          
      //   }catch(error){
      //     console.error(error)
      //   }


        
      //   }