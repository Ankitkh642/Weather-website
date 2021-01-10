const sgMail=require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendEmail=(message)=>{
    sgMail.send({
        to:'ankitkh6942@gmail.com',
        from:'ankitkh642@outlook.com',
        subject:'Weather App Help',
        text:message
    }).then(() => {
        console.log('Email sent')
    })
    .catch((error) => {
        console.error('Not sent')
    })
}

module.exports={
    sendEmail
}