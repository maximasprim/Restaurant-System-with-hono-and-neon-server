import "dotenv/config"
import nodemailer from 'nodemailer'
import { error, info } from "console"
import cron from 'node-cron';
import ejs from 'ejs'

// export const mailFunction = ( to: string, subject: string, text: string ) =>{
//     //transporter
//     const transporter =  nodemailer.createTransport({
//         service: 'gmail',
//         auth:{
//             user: process.env.Email,
//             pass: process.env.PASSWORD
//         }
//     })
//     const mailOptions = {
//         from:process.env.EMAIL,
//         to:"michaelmwasame16@gmail.com",
//         subject:"Confirmation mail",
//         text:"Registration successful"

//     }
//     // const mailOptions = {
//     //     from:process.env.EMAIL,
//     //     to,
//     //     subject,
//     //     text
//     // }

//     transporter.sendMail(mailOptions,(error, info)=>{
//         if(error){
//             console.log(error)
//         }else{
//             console.log(`Email sent:${info.response} `)
//         }
//     })
// }
// export default mailFunction;


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

// Define your inline templates
const templates: { [key: string]: string } = {
    'welcome-email': `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Welcome to My Restaurant API</title>
        </head>
        <body>
            <h1>Welcome to My Restaurant API</h1>
            <p>Your registration was successful!</p>
            <p><strong>Username:</strong> <%= username %></p>
            <p><strong>Password:</strong> <%= password %></p>
            <p>Thank you for joining us.</p>
        </body>
        </html>
    `
};

export const mailFunction = async (to: string, subject: string, templateName: string, templateData: any) => {
    try {
        const template = templates[templateName];
        if (!template) {
            throw new Error('Template not found');
        }
        const html = ejs.render(template, templateData);

        const mailOptions = {
            from: process.env.EMAIL,
            to: 'michaelmwasame16@gmail.com',
            subject,
            html
        };

        const info = await transporter.sendMail(mailOptions);
        console.log(`Email sent: ${info.response}`);
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Failed to send email');
    }
};

export default mailFunction;