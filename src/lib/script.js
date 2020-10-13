

const input = document.querySelector('input[name=price]')

input.addEventListener('keydown', function(Event){
    



    setTimeout(function(){
        let {value} = Event.target

        value = value.replace(/\D/g,"")

        Event.target.value = value
     
    }, 1)



  
})