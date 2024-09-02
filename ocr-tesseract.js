const express = require("express");
const app = express();
const multer = require("multer");
const tesseract = require("node-tesseract-ocr");
const path = require("path");
const cors = require("cors");
const { exec } = require("child_process");
const fs = require("fs");

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
  })
);

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// Check if the 'uploads' directory exists, if not, create it
const uploadsDir = path.join(__dirname, "uploads");

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    // Replace spaces with dashes in the file name
    const sanitizedFilename = file.originalname.replace(/\s+/g, "-");
    cb(null, sanitizedFilename);
  },
});

const upload = multer({
  storage: storage,
});

const config = {
  lang: "eng",
  oem: 1,
  psm: 3,
};

// Function to check if a file is an image
function isImage(file) {
  const ext = path.extname(file).toLowerCase();
  return [".jpg", ".jpeg", ".png", ".bmp", ".tiff"].includes(ext);
}

// Convert PDF to image
function convertPdfToImage(pdfPath, imagePath, callback) {
  exec(`convert -density 300 "${pdfPath}" -quality 100 "${imagePath}"`, callback);
}

app.post("/img-upload", upload.single("file"), (req, res) => {
  const file = req.file.filename;
  const filePath = `uploads/${file}`;

  if (isImage(file)) {
    // If the file is an image, proceed with OCR
    tesseract
      .recognize(filePath, config)
      .then((text) => {
        console.log("text: " + text);
        res.status(200).json({ text });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: err.message });
      });
  } else if (path.extname(file).toLowerCase() === ".pdf") {
    // If the file is a PDF, convert to an image first
    const imageFile = `uploads/${path.basename(file, ".pdf")}.png`;

    convertPdfToImage(filePath, imageFile, (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: err.message });
      }

      // Perform OCR on the converted image
      tesseract
        .recognize(imageFile, config)
        .then((text) => {
          console.log("text: " + text);
          res.status(200).json({ text });

          // Optionally, delete the temporary image file
          fs.unlink(imageFile, (err) => {
            if (err) console.log("Error deleting temporary image:", err);
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({ error: err.message });
        });
    });
  } else {
    res.status(400).json({ error: "Unsupported file type" });
  }
});

app.listen("5000", () => {
  console.log("Server started on port 5000");
});
