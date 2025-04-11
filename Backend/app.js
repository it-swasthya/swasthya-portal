import express from 'express';
import authRoutes from './routes/auth.routes.js';
import cartRoutes from './routes/cart.routes.js';
import { sequelize } from './config/db.js';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import paymentRoutes from './routes/payment.routes.js'
import invoicesRoutes from './routes/invoice.routes.js';
//import bookByPrescriptionRoutes from './routes/upload_prescription.routes.js';
import sendEmailRoutes from './routes/sendmail.routes.js';
import cors from 'cors';

dotenv.config();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors({
  origin:process.env.client_url,
  credentials:true,
  methods:["GET","POST","PUT","DELETE"]
}))



app.use(express.json());
app.use(cookieParser()); 
app.use(express.urlencoded({extended: true}));
//app.use("/api/book_by_Prescription", express.static(path.join(__dirname, "uploads")));

app.get("/ping", (req, res) => {
  res.send("pong");
});


app.use('/api/auth', authRoutes);
app.use("/api/cart", cartRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/invoice',invoicesRoutes);
//app.use('api/book_by_Prescription', bookByPrescriptionRoutes);
app.use('/api/sendmain', sendEmailRoutes);



sequelize.sync()
  .then(() => console.log('Database synced'))
  .catch(err => console.error('Database sync failed:', err));

export default app;
