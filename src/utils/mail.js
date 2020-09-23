const { info } = require('console')
const nodemailer=require('nodemailer')

const sendMsg=(message)=>{
    var transporter=nodemailer.createTransport({
        service : 'gmail',
        auth:{
            user:'ankitkh6942@gmail.com',
            pass:'Pawankh@12'
        }
    })
    
    var mailOptions={
        from:'ankitkh6942@gmail.com',
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