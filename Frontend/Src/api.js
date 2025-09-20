
import axios from 'axios';
const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';

export const api = axios.create({ baseURL: API_BASE });

export const productsAPI = () => api.get('/products').then(r=>r.data);
export const createOrderAPI = (payload) => api.post('/orders', payload).then(r=>r.data);
export const createIncomingInvoiceAPI = (payload) => api.post('/invoices', payload).then(r=>r.data);
