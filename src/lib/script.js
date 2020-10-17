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
  uploadLimit: 6,

  FilesInput(event) {
    const { files: fileList } = event.target;
    const { uploadLimit } = PhotosUpload;

    if (fileList.length > uploadLimit) {
      alert("Envie apenas 6 fotos"); 

      event.preventDefault();

      console.log(event);

      return;
    }

   
    Array.from(fileList).forEach((file) =>{
        
        const  reader = new FileReader()

        reader.onload = () => {
            const  image = new Image()

            image.src = String(reader.result)

            const  div = document.createElement('div')
            div.classList.add('photo')

            div.onclick = () => alert('remover foto')

            div.appendChild(image)

            document.querySelector('#photos-priview').appendChild(div)
            
        }

        reader.readAsDataURL(file)
    })
  },
};

