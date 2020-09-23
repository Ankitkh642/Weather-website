const { info } = require('console')
const nodemailer=require('nodemailer')

const sendMsg=(message)=>{
    var transporter=nodemailer.createTransport({
        host: "smtp.outlook.com", // hostname
        secureConnection: false, // TLS requires secureConnection to be false
        port: 587, // port for secure SMTP
        tls: {
        ciphers:'SSLv3'
        },
        auth: {
            user: 'yashikakh12@outlook.com',
            pass: 'Yashikakh@12'
        }
    })
    
    var mailOptions={
        from:'yashikakh12@outlook.com',
        to:'ankitkh642@gmail.com',
        subject:'Help Mail',
        text:message
    }
    
    transporter.sendMail(mailOptions,(error,info)=>{
    
        if(error)
        {
            console.log(error)
        }
        else{
            console.log("Email Sent: "+info.response)
        }
    })
}

module.exports=sendMsg