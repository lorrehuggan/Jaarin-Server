import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import userRoutes from './routes/user/index.js';
import jobRoutes from './routes/job/index.js';
import { connectDB, DB_AUTH } from './db/index.js';
import cors from 'cors';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const API = `/api/v1`;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use(`${API}/user`, userRoutes);
app.use(`${API}/job`, jobRoutes);

(async () => {
  try {
    await connectDB(DB_AUTH);
    console.log('connected to db');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error.message);
  }
})();
