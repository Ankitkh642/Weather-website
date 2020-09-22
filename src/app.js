const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')
const { query } = require('express')

const dircPath=path.join(__dirname,'../public')
const app=express()
const viewPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

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

app.get('/products',(req,res)=>{
    if(!req.query.search)
    {
        res.send({
            error:"No query obtained"
        })
    }
    else
    {
        res.send(req.query)
    }
})

app.get('*',(req,res)=>{
    res.render('error',{
        title : '404 Error',
        Name :'Ankit'
    })
})



app.listen(3000,()=>{
    console.log("Server started at port 3000")
})