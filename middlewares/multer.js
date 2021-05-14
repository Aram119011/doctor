const multer  = require('multer');
const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        if (!fs.existsSync('./uploads/users')){
            fs.mkdirSync('./uploads/users');
        }
        cb(null, './uploads/users');
        // cb(null, path.join(__dirname + "/public")
        //    const uploades = path.join(__dirname + "/public");
        // const images = path.join(uploades, '/users');
        // console.log(images, 'lllllllllllllllllllllll');

    },
    filename: function(req, file, cb) {
        // cb(null, file.originalname);
        cb(null, new Date().getTime().toString() + file.originalname)
    }
});



const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg' ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter
});

module.exports = upload;
