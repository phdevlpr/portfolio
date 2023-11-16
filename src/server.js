
require('dotenv').config();

const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

const app = express();
const PORT = process.env.PORT || 3001;
const corsOptions = {
    methods: 'POST',
}

dotenv.config();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());



app.post('/send-email', async (req, res) => {
    try {
        const { name, email, message } = req.body;

        const transporter = nodemailer.createTransport({
            host: 'smtp.hostinger.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: 'oi@paulosilva.tech',
            subject: 'Assunto do email',
            text: `Nome: ${name}\nE-mail: ${email}\nMensagem: \n${message}'`,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).send('email enviado com sucesso!')
    } catch (error) {
        console.error('Erro ao enviar e-mail:', error);
        res.status(500).send('erro ao enviar email!')
    }    
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);

});