import express from 'express';

import auth from '../middleware/auth.js';
export const router = express.Router();


router.get('/', (req, res) => {
    res.send('Hello World!');
    }
);

router.post('/login',auth, (req, res) => {
    console.log("Login request received");
    res.send('Hello World!');
    }
);


