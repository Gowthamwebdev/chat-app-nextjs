import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { dbConn } from './Database/dbConfig.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/users', userRoutes)

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
    dbConn();
})