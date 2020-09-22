const request=require('request')

const forecast=(lat,long,callback)=>{
    const url="http://api.weatherstack.com/current?access_key=c3fa0c18c5e1b0e629b999ec7a262666&query="+lat+","+long
    request({url:url,json:true},(error,response)=>{
     if(error)
     {
         callback('Network not found',undefined)
     }
     else if(response.body.error)
     {
        callback('Location Not found',undefined)   
     }
     else
     {
             callback(undefined,{
             temperature : response.body.current.temperature,
             precipitation : response.body.current.precip,
             description : response.body.current.weather_descriptions[0]
         })
     }
    })
}

module.exports=forecast