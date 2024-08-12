require('dotenv').config();
import express from 'express';
import cors from 'cors';
import path from 'path';
import { signatureRoutes } from './routes/signatureRoutes';
import { uploadRoutes } from './routes/uploadRoutes';

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use('/api/signatures', signatureRoutes);
app.use('/api/upload', uploadRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
