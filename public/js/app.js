console.log('Client side JavaScript Loaded')




const input=document.querySelector('input')
const weatherForm=document.querySelector('form')
const msg1=document.querySelector('#p1')
const msg2=document.querySelector('#p2')
weatherForm.addEventListener('submit',(e)=>{

    e.preventDefault()
    const location=input.value
    fetch('http://localhost:3000/weather?address='+location).then(response=>{
    response.json().then((data)=>{
        if(data.error)
        {
            console.log(data.error)
            msg1.textContent=data.error
        }
        else
        {
            msg1.textContent=data.place
            msg2.textContent='The temperature is ' +data.forres.temperature+' degree Celsius.It is '+data.forres.description+' here.'
        }
        })
    })
})
