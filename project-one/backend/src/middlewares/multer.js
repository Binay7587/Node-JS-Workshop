import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads/books')
    },
    filename: function (req, file, cb) {
    const imagename = Date.now() + '-' + Math.round(Math.random() * 1E9)+"-"+file.originalname.trim();
        cb(null, imagename)
    }
  })
  
//   const upload = multer({ storage });

 export default multer({storage:storage});