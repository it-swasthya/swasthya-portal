// import { Prescription } from "../models/prescription.model.js";

//  export const uploadPrescription = async (req, res) => {
//   try {
//     const file = req.file;
//     const userId = req.user.id;

//     if (!file) {
//       return res.status(400).json({ message: "File not uploaded" });
//     }


//     const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
//     const maxsize = 5*1024*1024;
//     if(!allowedTypes.includes(file.mimetype)) {
//       return res.status(400).json({message:"Invalid file type"});
//     }

//     if (file.size > maxsize) {
//       return res.status(400).json({message:"file too large, max size is 5MB"});
//     }

//     const newPrescription = await Prescription.create({
//       userId,
//       filename: file.originalname,
//       fileUrl: file.location,
//       mimetype: file.mimetype,
//     });

//     res.status(201).json({
//       message: "Prescription uploaded successfully",
//       data: newPrescription,
//     });
//   } catch (error) {
//     console.error("Upload error:", error);
//     res.status(500).json({ message: "Something went wrong" });
//   }
// };

// // export const getPriscription = async (req,res) =>{
// //   try {
// //     const prescriptions = await Prescription.findAll({
// //       where :{User_id: req.user.id}
    


// //     })
// //   }
// // }
