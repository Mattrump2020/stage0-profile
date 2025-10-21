import express from 'express';
import cors from 'cors';
import meRouter from './routes/me.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Basic logging middleware (placed before routes to log all requests)
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.originalUrl}`);
  next();
});

app.get('/', (req, res) => {
  res.type('application/json').status(200).send({ status: 'ok' });
});

app.use('/me', meRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
