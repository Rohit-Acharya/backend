import express from 'express';

import { sendmail } from '../api/message.js';


const router= express.Router();
router.options('/sendmail', (req, res) => {
    // This is the preflight request, send back the necessary CORS headers
    res.header('Access-Control-Allow-Origin', 'https://portfolio-seven-inky-37.vercel.app');
    res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Add other headers if you use them
    res.status(200).send();
});
router.post("/sendmail",sendmail)

export default router;