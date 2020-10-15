

const input = document.querySelector('input[name=price]')

input.addEventListener('keydown', function(Event){
    



    setTimeout(function(){
        let {value} = Event.target

        value = value.replace(/\D/g,"")

        value  = new Intl.NumberFormat('AOA', {
            style: 'currency',
            currency : "AOA"

        }).format(value/100)

        Event.target.value = value
     
    }, 1)



  
})