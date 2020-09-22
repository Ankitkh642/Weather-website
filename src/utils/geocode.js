const request = require('request')
const geocode=(adress,callback)=>{
    const url="https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(adress)+".json?access_token=pk.eyJ1IjoiYW5raXRraDY0MiIsImEiOiJja2Y1bnhoOHUwZmVjMnJ0MTJiYndyam81In0.H76gBs8RQVcMsKVDXKvN9g&limit=1"
 
    request({ url:url , json:true},(error,response) => {
            if(error)
            {
                callback('Unable to connect',undefined)
            }
            else if(response.body.features.length===0)
            {   
             callback('Unable to find location',undefined)
            }
            else
            {
                callback(undefined,{
                    lattitude : response.body.features[0].center[1],
                    longitude : response.body.features[0].center[0],
                    place : response.body.features[0].place_name
                })
            }
       })
 
 }
 
 module.exports = geocode