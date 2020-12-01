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
  
  forms.addEventListener('submit', paraEvento)

}verficarForms()





//Funcao Alert Delete






function locations(edit) {
  const currentpage = document.location.pathname;


  if (currentpage.includes(edit)) {
    let formDelet = document.querySelector("#form-delete");

    formDelet.addEventListener("submit", function (event) {
      const confirmDelete = confirm("do you like delete this user ?");

      if (!confirmDelete) {
        event.preventDefault();
      }
    });
  }
}
locations("edit");

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
  }


  
  
}


//upload Photos
//gerenciador de Photos

const PhotosUpload = {
  priview: document.querySelector("#photos-priview"),
  files: [],
  uploadLimit: 6,
  input: "",

  FilesInput(event) {
    const {
      files: fileList
    } = event.target;
    PhotosUpload.input = event.target;

    if (PhotosUpload.hasLimit(event)) return;

    Array.from(fileList).forEach((file) => {
      const reader = new FileReader();

      PhotosUpload.files.push(file);

      reader.onload = () => {
        const image = new Image();

        image.src = String(reader.result);

        const div = PhotosUpload.getConteiner(image);

        PhotosUpload.priview.appendChild(div);
      };

      reader.readAsDataURL(file);
    });

    PhotosUpload.input.files = PhotosUpload.getAllFiles();
  },


  //colocar limite de Uploud de Photos
  hasLimit(event) {
    const {
      uploadLimit,
      input,
      priview
    } = PhotosUpload;
    const {
      files: fileList
    } = input;

    if (fileList.length > uploadLimit) {
      alert(`Envie no máximo ${uploadLimit} fotos`);
      event.preventDefault();

      return true;
    }

    const photoDiv = [];

    priview.childNodes.forEach((item) => {
      if (item.classList && item.classList.value == "photo")
        photoDiv.push(item);
    });

    const totalPhotos = fileList.length + photoDiv.length;

    if (totalPhotos > uploadLimit) {
      alert("Você atingiu o limite máximo de fotos");
      event.preventDefault();
      return true;
    }

    return false;
  },


  //Pega Todos as Photos carregadas apartir do DataTransfer do Google Chrome
  getAllFiles() {
    const dataTransfer =
      new ClipboardEvent("").clipboardData || new DataTransfer();

    PhotosUpload.files.forEach((file) => dataTransfer.items.add(file));

    return dataTransfer.files;
  },


  //Coloca a Photo na div
  getConteiner(image) {
    const div = document.createElement("div");
    div.classList.add("photo");

    div.onclick = PhotosUpload.removePhotos;

    div.appendChild(image);

    div.appendChild(PhotosUpload.getRemoveButton());

    return div;
  },


  //Cria o Button de Remover as Photos com Material Icon
  getRemoveButton() {
    const button = document.createElement("i");
    button.classList.add("material-icons");

    button.innerHTML = "close";

    return button;
  },


  //Evento de Remover Photos do Array ou do nosso Priview
  removePhotos(event) {
    const photoDiv = event.target.parentNode;
    const photosArray = Array.from(PhotosUpload.priview.children);
    const index = photosArray.indexOf(photoDiv);

    PhotosUpload.files.splice(index, 1);
    PhotosUpload.input.files = PhotosUpload.getAllFiles();

    photoDiv.remove();
  },

  removeOldPhoto(event) {

    const photoDiv = event.target.parentNode

    if (photoDiv.id) {
      const removeFiles = document.querySelector('input[name="removed_files"]')

      if (removeFiles) {

        removeFiles.value += `${photoDiv.id},`
      }
    }

    photoDiv.remove()
  },

};


const imageGallery = {

  preview: document.querySelectorAll('.gallery-preview  > img'),

  highlight: document.querySelector('.highlight > img'),

  setImage(event) {
    const {
      target
    } = event
    imageGallery.preview.forEach(priview => priview.classList.remove('active'))

    target.classList.add('active')

    imageGallery.highlight.src = target.src
    animationZoomImage.image.src = target.src



  }

}


const animationZoomImage = {

  target: document.querySelector('.lightbox-target'),
  image: document.querySelector('.lightbox-target  img'),
  closeButton: document.querySelector('.lightboxClose'),



  open() {

    animationZoomImage.target.style.opacity = 1
    animationZoomImage.target.style.top = 0
    animationZoomImage.target.style.visibility = "visible"
    animationZoomImage.closeButton.style.top = "-10px"
    animationZoomImage.closeButton.style.transition = "all ease-in 200ms";

  },
  close() {

    animationZoomImage.target.style.opacity = 0
    animationZoomImage.target.style.top = -"-100%"
    animationZoomImage.target.style.visibility = "hidden"

    animationZoomImage.closeButton.style.top = "-200px"
    animationZoomImage.closeButton.style.transition = "none";

  }
}
