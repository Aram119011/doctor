const multer = require('multer');
const fs = require('fs');


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        if (!fs.existsSync('./uploads/certificate')){
            fs.mkdirSync('./uploads/certificate');
        }
        cb(null, './uploads/certificate');

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

const uploadCertificate =  multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter
});

module.exports = uploadCertificate;
