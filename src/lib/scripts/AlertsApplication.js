
const currentpage = document.location.pathname;

const pathsNames = ['edit', 'users']


const form = document.querySelector('#form-delete')

form.addEventListener('click', (event) => {


  for (let i = 0; i < pathsNames.length; i++) {
    if (currentpage.includes(pathsNames[i])) {

      const message = form.dataset.message

      const confirmAlert = confirm(message)


      if (!confirmAlert) {
        event.preventDefault()

      }
    }
  }

})






