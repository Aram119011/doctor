const multer = require('multer');
const fs = require('fs');


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        if (!fs.existsSync('./uploads/uploadGroup')){
            fs.mkdirSync('./uploads/uploadGroup');
        }
        cb(null, './uploads/uploadGroup');


    },
    filename: function (req, file,cb) {
        cb(null, new Date().getTime().toString() + file.originalname)
    }
});

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg'){
        cb(null, true);
    }else{
        cb(null, false);
    }
};

const uploadGroup = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter
});

module.exports = uploadGroup;
