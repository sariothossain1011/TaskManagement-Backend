const nodemailer = require('nodemailer')
// const smtpTransport = require('nodemailer-smtp-transport');
const SendEmailUtility =async(EmailTo,EmailText,EmailSubject)=>{

    let transporter = nodemailer.createTransport({
        // host: process.env.EMAIL_HOST,
        host: 'mail.teamrabbil.com',
        // port: 587,
        port: 25,
        secure:true,
        auth:{
            // user:process.env.EMAIL_OUTLOOK,
            // pass: process.env.PASSWORD_OUTLOOK,
            user:"info@teamrabbil.com",
            pass: "~sR4[bhaC[Qs",
        },
        tls: {
            rejectUnauthorized: false,
        }
    })
    
    let mailOptions = {
        from:'Task Manager MERN <info@teamrabbil.com>',
        to: EmailTo,
        subject: EmailSubject,
        text:EmailText,
    }
    return await transporter.sendMail(mailOptions);
}



module.exports = SendEmailUtility