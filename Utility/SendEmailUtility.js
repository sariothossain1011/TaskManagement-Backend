const nodemailer = require('nodemailer');

const SendEmailUtility =async(EmailTo,EmailText,EmailSubject)=>{

    let transporter = nodemailer.createTransport({
        host: 'smtp-mail.outlook.com',
        port: 587,
        secure:false,
        auth:{
            user: 'sariothossainweb1011@outlook.com',
            pass: 'sariot1011webtest',
        },
        tls: {
            rejectUnauthorized: false,
        }
    })
    
    let mailOptions = {
        from:' TASK MANAGER <sariothossainweb1011@outlook.com>',
        to: EmailTo,
        subject: EmailSubject,
        text:EmailText,
    }
    return await transporter.sendMail(mailOptions);
}



module.exports = SendEmailUtility







