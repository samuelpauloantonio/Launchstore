


const Mask = {
    apply(input, func) {
      setTimeout(function () {
        input.value = Mask[func](input.value);
      }, 1);
    },
  
    formtAOA(value) {
      value = value.replace(/\D/g, "");
  
      return new Intl.NumberFormat("AOA", {
        style: "currency",
        currency: "AKZ",
      }).format(value / 100);
    },
  
  
    cpfCnpj(value){
  
        
          //input.value = value.replace(/(\D{4})(\D{4})/, "$1");
  
  
          value = value.replace(/\D/g,"")
  
          if(value.length > 14)
            value =  value.slice(0, -1)
  
          if(value.length  > 11){
            
            value = value.replace(/(\d{2})(\d)/,"$1-$2")
            value = value.replace(/(\d{3})(\d)/,"$1-$2")
            value = value.replace(/(\d{3})(\d)/,"$1/$2")
            value = value.replace(/(\d{4})(\d)/,"$1-$2")
          }
          else{
            value = value.replace(/(\d{3})(\d)/,"$1.$2")
            value = value.replace(/(\d{3})(\d)/,"$1.$2")
            value = value.replace(/(\d{3})(\d)/,"$1-$2")
          }
  
          return value
      
      
      
    }, cep(value){
  
      value = value.replace(/\D/g,"")
  
      if(value.length > 8)
        value =  value.slice(0, -1)
  
      value = value.replace(/(\d{3})(\d)/,"$1-$2")
  
  
      return value
  
    }
  };
  
  
  //validate 
  
  
  const validate = {
    apply(input, func){
  
      validate.clearErrors(input)
  
      let results = validate[func](input.value)
  
          input.value = results.value
  
          if(results.error) {
          validate.displayError(input, results.error)
  
          }
    },
  
  
    displayError(input, error){
      const div = document.createElement('div')
            div.classList.add('error')
            div.innerHTML = error
            input.parentNode.appendChild(div)
            input.style = "outline-color:red"
            input.focus()
    },
  
    clearErrors(input){
      const errorDiv = input.parentNode.querySelector('.error')
    
      input.style = 'var(--outline-color)'
        if(errorDiv){
          errorDiv.remove()
  
        }
    },
  
    isEmail(value) {
      let error = null
  
      const  emailFotmat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  
  
      if(!value.match(emailFotmat))
        error = "Email inválido"
  
  
  
      return {
        error,
        value
      }
  
    },
    isCpfCnpj(value){
  
  
        let error = null 
  
        const cleanValue = value.replace(/\D/g,"")
  
        if(cleanValue.length > 11 &&  cleanValue.length !== 14){
          error = "CNPJ incorreto"
        }
  
        else if(cleanValue.length < 12 && cleanValue.length !== 11){
          error  = "CPF incorrento"
        }
  
  
        return {
          error,
          value
        }
    },
  
    isCep(value){
  
      let error = null 
  
      const cleanValue = value.replace(/\D/g,"")
  
      if(cleanValue.length  !==  8 ){
        error = "CEP incorreto"
      }
  
  
      return {
        error,
        value
      }
    },

    allInputs(e){
     
      const inputs = document.querySelectorAll('.item select, .item input , .item textarea')

      for(input of inputs) {
        if(input.value == ""){
          const  message  = document.createElement('div')

                message.classList.add('messages')
                message.classList.add('error')

                message.style="position:fixed"

            message.innerHTML = 'Todos os campos são Obrigatórios'
            document.querySelector('body').append(message)

        e.preventDefault()

        }
      }

    }
  
  
    
    
  }