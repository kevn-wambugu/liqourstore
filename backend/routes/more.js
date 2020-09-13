import express from 'express';
import asyncHandler from 'express-async-handler';
import { isAuth, isAdmin } from '../util';

const router = express.Router();

router.get('/contact', (req, res) => {
    res.send('Hello')
  })

router.get('/about', (req, res) => {
    res.send('Hello World!')
  })

export default router;