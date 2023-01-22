const nodemailer = require('nodemailer')
// const smtpTransport = require('nodemailer-smtp-transport');
const SendEmailUtility =async(EmailTo,EmailText,EmailSubject)=>{

    let transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: 587,
        secure:false,
        auth:{
            user:process.env.EMAIL_OUTLOOK,
            pass: process.env.PASSWORD_OUTLOOK,
        },
        tls: {
            rejectUnauthorized: false,
        }
    })
    
    let mailOptions = {
        from:'Task Manager MERN <sariothossain1011@outlook.com>',
        to: EmailTo,
        subject: EmailSubject,
        text:EmailText,
    }
    return await transporter.sendMail(mailOptions);
}



module.exports = SendEmailUtility