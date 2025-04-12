const express = require('express')
const router = express.Router()

const { sendTemplate, transporter } = require('../utils/mail');

router.get('/send', (req, res) => {
    const { user, qrCodeUrl } = req.body;

    if (!user || !user.email || !qrCodeUrl) {
        return res.status(400).json({ message: 'missing user or QR code data', type: 'error' });
    }

    const templateData = {
        name: user.firstName,
        lastName: user.lastName,
        email: user.email,
        table: user.table,
        dietary: user.dietaryPreferences || 'None',
        qrCode: qrDataURL,
    };

    try {
        sendTemplate('simple-ticket', templateData, user.email, 'Your Event Ticket');
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