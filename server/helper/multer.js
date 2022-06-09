const multer = require("multer");
const path = require('path');

const diskStorage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, path.join(__dirname + "/../upload/"));
    },
    filename: (_, file, cb) => {
        cb(null,  Date.now() + '-' +file.originalname);
    },
});
const multerSetup = multer({ storage: diskStorage });

module.exports = { multerSetup };