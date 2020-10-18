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
};



const PhotosUpload = {

  priview :  document.querySelector('#photos-priview'),

  uploadLimit: 6,

  FilesInput(event) {
    
    const { files: fileList } = event.target;
  
    if(PhotosUpload.hasLimit(event)) return 
   
    Array.from(fileList).forEach((file) =>{
        
        const  reader = new FileReader()

        reader.onload = () => {
            const  image = new Image()

            image.src = String(reader.result) 

           const div = PhotosUpload.getConteiner(image)

           PhotosUpload.priview.appendChild(div)
            
        }

        reader.readAsDataURL(file)
    })
  },

  hasLimit(event){

    const {files : fileList } = event.target
    const { uploadLimit } = PhotosUpload;

    if (fileList.length > uploadLimit) {
      alert(`Envie no máximo ${uploadLimit } fotos` ); 

      event.preventDefault();

      return true ;
    }

    return false
  },
  
  getConteiner(image){
    const  div = document.createElement('div')
    div.classList.add('photo')

    div.onclick = PhotosUpload.removePhotos

    div.appendChild(image)

    div.appendChild(PhotosUpload.getRemoveButton())

    return div
  },

  getRemoveButton(){

    const  button = document.createElement('i')
    button.classList.add('material-icons')
    
    button.innerHTML = "close"

    return button
    
  },

  removePhotos(event){
    const photoDiv  = event.target.parentNode
    const photosArray  = Array.from(PhotosUpload.priview.children)
    const index = photosArray.indexOf(photoDiv)

    console.log(photosArray)

    photoDiv.remove();
  }
};

