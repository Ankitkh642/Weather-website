const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')
const { query } = require('express')

const mail=require('./utils/mail')
const {sendEmail} = require('./utils/mail')

const dircPath=path.join(__dirname,'../public')
const app=express()
const viewPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

const port=process.env.PORT || 3000

app.use(express.static(dircPath))
app.set('view engine','hbs')
app.set('views',viewPath)

hbs.registerPartials(partialsPath)

app.get("",(req,res)=>{
    res.render('index',{
        title : 'WeatherFind.Com',
        city: 'jaipur'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title : 'Help',
        helpMenu : 'Tap for more help'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title : 'About',
        Name :'Ankit',
        City:'Jaipur'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
        res.send({
            error:"No address sent"})
    }
    else
    {
        geocode(req.query.address,(error,geores)=>
        {
            if(error)
            {
                res.send({
                    error:error})
            }
            else 
            {
                console.log(geores)
                forecast(geores.lattitude,geores.longitude,(forerror,forres)=>{
                    if(forerror)
                    {
                        res.send(forerror)
                    }
                    else
                    {
        
                        res.send({
                            place: geores.place,
                            forres,
                            location:req.query.address
                        })
                    }
                })
            }
        })
    }
})

app.get('/send',(req,res)=>{
    if(!req.query.message)
    {
        res.send({
            error:'No message found'
        })
    }
    else{
        sendEmail(req.query.message)
        res.send({
            success:'Message sent successfully'
        })
    }
})

app.get('*',(req,res)=>{
    res.render('error',{
        title : '404 Error',
        Name :'Ankit'
    })
})





app.listen(port,()=>{
    console.log("Server started at port "+port)
})