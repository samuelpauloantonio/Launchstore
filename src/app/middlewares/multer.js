//require multer

const multer = require('multer')

//config multer
const storage = multer.diskStorage({

    destination : (req, file, callback) => {

        callback(null, './public/images')
    },


    filename : (req, file, callback) =>{

        callback(null, `${Date.now().toString()}-${file.originalname}`)
    }
})

//images aceites config
const fileFilter = (req, file, callback)=>{
    const isAccepted = ['image/png', 'image/jpg', 'image/jpeg']
    .find(acceptedFormat => acceptedFormat == file.mimetype)

    if(isAccepted){
        return callback(null, true)
    }

    return callback(null, false)
}

module.exports = multer({
    storage,
    fileFilter
})
