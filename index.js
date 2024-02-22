import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import adminRoutes from './src/routes/adminRoutes.js';
import projectRoutes from './src/routes/projectsRoutes.js'
import connectDB from './config/db.js';

dotenv.config();
const port = process.env.PORT;
const app = express();
app.use(cors())
app.use(express.json());

connectDB();

app.use('/admin', adminRoutes)
app.use('/projects', projectRoutes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})