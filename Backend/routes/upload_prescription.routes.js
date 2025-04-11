 
// import express from "express";
// import multer  from "multer";
// import multerS3 from "multer-s3";
// import s3 from "../config/awsS3.config.js";
// import dotenv from 'dotenv';
// import { uploadPrescription } from "../controllers/upload-prescription.controller.js";
// import {authenticate}  from "../middleware/auth.middleware.js";

// dotenv.config();

// const router = express.Router();

// // File filter
// const fileFilter = (req, file, cb) => {
//   const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
//   if (allowedTypes.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(new Error("Invalid file type. Only JPG, PNG, and PDF are allowed."), false);
//   }
// };

// // Multer S3 Storage
// const upload = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: process.env.AWS_BUCKET_NAME,
//     acl: "public-read",
//     key: (req, file, cb) => {
//       const filename = Date.now() + "-" + file.originalname;
//       cb(null, filename);
//     },
//   }),
//   limits: { fileSize: 5* 1024 * 1024 }, // 5MB limit
//   fileFilter: fileFilter,
// });

// router.post("/uploadfile", authenticate, upload.single("prescription"), uploadPrescription);

// export default  router;

