const express = require('express')
const router = express.Router()

const { sendTemplate, transporter } = require('../utils/mail');

router.get('/', (req, res) => {
	res.send('gmail endpoint')
})

router.post('/send', (req, res) => {
    const { user, qrCodeUrl } = req.body;

    if (!user || !user.email || !qrCodeUrl) {
        return res.status(400).json({ message: 'missing user or QR code data', type: 'error' });
    }

    console.log(`emailing user: ${user.email}`);

    const templateData = {
        firstName: user.firstName,
        lastName: user.lastName,
        table: user.table,
        dietary: user.dietaryPreferences || 'None',
        qrCode: qrCodeUrl,
    };

    try {
        sendTemplate('ticket', templateData, user.email, 'Community Over Cancer 2025 - Registration Successful', transporter);
        res.status(200).json({ message: 'email sent', type: 'success' });
    } catch (err) {
        console.error('email error:', err);
        res.status(500).json({ 
            message: err.message || 'unknown error',
            type: err.type || 'error'
        });
    }
})

module.exports = router