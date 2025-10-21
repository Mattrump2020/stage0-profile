import express from 'express';
import getCatFact from '../utils/fetchCatFact.js';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

const USER_EMAIL = process.env.USER_EMAIL || 'you@example.com';
const USER_NAME = process.env.USER_NAME || 'Your Full Name';
const USER_STACK = process.env.USER_STACK || 'Node.js/Express';

router.get('/', async (req, res) => {
  try {
    const fact = await getCatFact();
    const timestamp = new Date().toISOString();

    const payload = {
      status: 'success',
      user: {
        email: USER_EMAIL,
        name: USER_NAME,
        stack: USER_STACK
      },
      timestamp,
      fact
    };

    res.type('application/json').status(200).json(payload);
  } catch (err) {
    console.error('Unexpected error in /me:', err);
    const fallback = 'Could not fetch a cat fact at this time.';
    const timestamp = new Date().toISOString();
    res.type('application/json').status(200).json({
      status: 'success',
      user: {
        email: USER_EMAIL,
        name: USER_NAME,
        stack: USER_STACK
      },
      timestamp,
      fact: fallback
    });
  }
});

export default router;
