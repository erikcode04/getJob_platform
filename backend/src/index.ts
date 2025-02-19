import express from 'express';
import connectDB from './db';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, TypeScript MERN!');
});

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});