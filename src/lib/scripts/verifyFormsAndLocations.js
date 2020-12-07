
//Verificar formularios se estao  preenchidos

function verficarForms(){
    const forms  = document.querySelector('.user-register form')
  
    function VerificarInputs(e){
      
      let inputs = forms.querySelectorAll('input')
  
      Array.from(inputs).forEach(input =>  {
        
        if(input.value == "" ) {
            
           let  attr  =  input.getAttribute('attr')
  
            alert(` Por favor preencha o Campo : ${attr}` )
  
          
  
  
          e.preventDefault()
        }else if(input[type=email]){
          const  input_email = document.querySelector('input[type=email]')
               
                input_email.value.trim() //tirar o espeço no value do email
        }
      })
   
  
    }
    
  if(forms){
    forms.addEventListener('submit', VerificarInputs)
  }
  
  }verficarForms()
  
  