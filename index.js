import express from 'express';
import bodyParser from 'body-parser';
import usersRoutes from './routes/users/index.js';
import { connectDB, DB_AUTH } from './db/index.js';
import cors from 'cors';

const app = express();
const PORT = 5000;
const API = `/api/v1`;

app.use(cors());
app.use(bodyParser.json());

app.use(`${API}/user`, usersRoutes);

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
