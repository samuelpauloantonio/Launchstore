
//Verificar formularios se estao  preenchidos

function verficarForms(){
    const forms  = document.querySelector('.user-register form')
  
    function paraEvento(e){
      
      let inputs = forms.querySelectorAll('input')
  
      Array.from(inputs).forEach(input =>  {
        
        if(input.value == "" ) {
            
           let  attr  =  input.getAttribute('attr')
  
            alert(` Por favor preencha o Campo : ${attr}` )
  
          
  
  
          e.preventDefault()
        }
      })
   
  
    }
    
  if(forms){
    forms.addEventListener('submit', paraEvento)
  }
  
  }//verficarForms()
  
  