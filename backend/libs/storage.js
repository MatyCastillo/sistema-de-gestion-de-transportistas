const multer = require("multer");
const path = require("path");
const { format } = require("date-fns");

const today = new Date();

const storage = multer.diskStorage({
  destination: path.join(__dirname, "../images"),

  filename: (req, file, cb) => {
    // Formatear la fecha con date-fns
    const formattedDate = format(today, "dd-MM-yyyy_HH-mm-ss");

    // Construir el nombre del archivo usando prov_id, img_nombre y la fecha formateada
    const fileName = `${req.body.prov_id}-${req.body.img_nombre}_${formattedDate}`;
    
    cb(null, fileName + path.extname(file.originalname).toLocaleLowerCase());
  },
});

const upload = multer({ storage });

module.exports = upload;
