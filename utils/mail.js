const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');
const nodemailer = require('nodemailer');

const user = process.env.EMAIL;
const pass = process.env.APP_PASSWORD;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: user,
        pass: pass
    }
});

const templatesDir = '../templates/';

function loadAndRenderTemplate(template, replacements, callback) {
    fs.readFile(path.join(__dirname, templatesDir, template + '.html'), 'utf8', (err, content) => {
        if (err) {
            console.log('error reading html template:', err);
            return;
        }
        const compiledTemplate = handlebars.compile(content);
        const renderedHtml = compiledTemplate(replacements);
        callback(renderedHtml);
    });
}

function sendTemplate(template, replacements, receiver, subject, transporter) {
    loadAndRenderTemplate(template, replacements, function(htmlContent) {
        var mailOptions = {
            from: user,
            to: receiver,
            subject: subject,
            html: htmlContent
        };
        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log(error)
            } else {
                console.log('email sent: ' + info.response);
            }
        });
    });
}

module.exports = {
	transporter,
	sendTemplate,
}