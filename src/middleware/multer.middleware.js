const multer = require("multer");
const fs = require("fs");
const path = require("path");

// folder name
const NAME = "public";

// if fodler doen't exist, then create
if (!fs.existsSync(NAME)) {
  fs.mkdirSync(NAME);
}
const folderPath = path.resolve(NAME);

const customStorage = multer.diskStorage({
  // defining destination for storing uploaded images
  destination: (req, file, cb) => {
    cb(null, folderPath);
  },

  // custome file name
  filename: (req, file, cb) => {
    const fileName = `${file.fieldname}_${Date.now()}.${
      file.originalname.split(".")[1]
    }`;
    cb(null, fileName);
  },
});

const uploads = multer({ storage: customStorage });

// const uploadType = {
//   // allowing only one file at a time for uploading
//   single: uploads.single("profileImage"),
// };

module.exports = uploads;
