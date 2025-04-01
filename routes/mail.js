const express = require('express')
const router = express.Router()

const { sendTemplate, transporter } = require('../utils/mail');

router.get('/send', (req, res) => {
    sendTemplate('test-replace', { name: 'tim', event: 'the event.' }, 'sweavertheslayr@outlook.com', 'test', transporter);
    res.status(200).json({
        message: 'sent',
        type: 'success',
    })
})

module.exports = router