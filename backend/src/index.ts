import express from 'express';
import connectDB from './db';
import cors from 'cors';
import authRouter from './routes/authRoute';
import passport from './config/passportConfig';
import session from 'express-session';

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: false,
}));
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

app.use(passport.initialize());
app.use(passport.session()); 
app.use('/auth', authRouter);

app.get('/', (req, res) => {
  res.send('Hello, TypeScript MERN!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});