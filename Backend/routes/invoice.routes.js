import express from 'express';
import { createInvoice, getAllInvoices } from '../controllers/invoices.controller.js';

const router = express.Router();

router.post('/create-invoice', createInvoice);
router.get('/get-invoices', getAllInvoices);

export default router;
