import express from 'express';
import actionRoutes from './routes/actionRoutes';

const app = express();
app.use(express.json());
app.use('/actions', actionRoutes);

export default app;
