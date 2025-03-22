import multer from "multer";
import path from "path";

const tempDir = path.join(process.cwd(), "public/temp"); // Ensure consistent path

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("Saving file to:", tempDir);
    cb(null, tempDir);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

export const upload = multer({ storage });
