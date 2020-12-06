
const currentpage = document.location.pathname;

const pathsNames = ['edit', 'users']




for (let i = 0; i < pathsNames.length; i++) {
  if (currentpage.includes(pathsNames[i])) {

    if(document.querySelector('#form-delete')){


      const form = document.querySelector('#form-delete')

      form.addEventListener('click', (event) => {

          const message = form.dataset.message
    
          const confirmAlert = confirm(message)
    
    
          if (!confirmAlert) {
            event.preventDefault()
          }
       
    })
    }
    
  }
}









