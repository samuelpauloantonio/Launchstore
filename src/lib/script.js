


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
};



function DeleteUser(){

let  formDelet  = document.querySelector('#form-delete')
 
     formDelet.addEventListener('submit', function(event){
         const confirmDelete  = confirm('do you like delete this user ?')
 
         if(!confirmDelete){
             event.preventDefault()
         }
     })
 }
 DeleteUser()
 