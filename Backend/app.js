import express from 'express';
import authRoutes from './routes/auth.routes.js';
import cartRoutes from './routes/cart.routes.js';
import { sequelize } from './config/db.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import paymentRoutes from './routes/payment.routes.js'
import invoicesRoutes from './routes/invoice.routes.js'

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser()); 

app.get("/ping", (req, res) => {
  res.send("pong");
});


app.use('/api/auth', authRoutes);
app.use("/api/cart", cartRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/invoice',invoicesRoutes);



sequelize.sync({ alter: true })
  .then(() => console.log('Database synced'))
  .catch(err => console.error('Database sync failed:', err));

export default app;
