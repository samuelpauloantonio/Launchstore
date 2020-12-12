
//Verificar formularios se estao  preenchidos

function verficarForms(){
    const form  = document.querySelector('.form form ')
  
    function VerificarInputs(e){
      
      let inputs = form.querySelectorAll('input')
  
      Array.from(inputs).forEach(input =>  {
        
        if(input.value == "" ) {
            
           let  attr  =  input.getAttribute('attr')
  
            alert(` Por favor preencha o Campo : ${attr}` )
  
          
  
  
          e.preventDefault()
        }else if(document.querySelector('input[type=email]') || document.querySelector('input[type=password]')){
          const  input_email = document.querySelector('input[type=email]')
          const  input_password = document.querySelector('input[type=password]')
               
                input_email.value.trim() //tirar o espeço no value do email
                input_password.value.trim()
         
        }
      })
   
  
    }
    
  if( form){
    form.addEventListener('submit', VerificarInputs)
  }
  
  }verficarForms()
  
  