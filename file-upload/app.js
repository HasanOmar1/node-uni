// ! install multer: npm install --save multer
// ! Multer is a Node.js middleware for handling multipart/form-data that makes the otherwise painstaking process of uploading files in Node.js much easier.

// ! Multer does the work of body-parser by attaching the values of text fields in the req.body object. Multer also creates a new object for multiple files, either req.file or req.files, which holds information about those files.

const path = require("path");

const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));

// parse form data
app.use(express.urlencoded({ extended: false }));

// parse json
app.use(express.json());

// multer settings
// ---------------------------
const multer = require("multer");

// const upload = multer({ dest: 'uploads/' });
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png"];
    if (!allowedTypes.includes(file.mimetype, 0)) {
      return cb(new Error("Invalid file type"), false);
    }
    cb(null, true);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname); // Get file extension
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName); // Generate unique file name
  },
});

const upload = multer({ storage: storage });

// ---------------------------

// uploaded_file is the name in the form input in html
app.post("/upload-file", upload.single("uploaded-file"), (req, res, next) => {
  console.log(req.file);
  // req.file is the `uploaded_file` file
  // req.body will hold the text fields, if there were any
  res.json({ message: "Successfully uploaded file" });
});

app.post("/upload-files", upload.array("uploaded-file"), (req, res, next) => {
  // req.files are the `uploaded_file` files
  console.log(req.files);
  res.json({ message: "Successfully uploaded files" });
});

app.listen(port);
