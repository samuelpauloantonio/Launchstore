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

//upload Photos
//gerenciador de Photos

const PhotosUpload = {
  priview: document.querySelector("#photos-priview"),
  files: [],
  uploadLimit: 6,
  input: "",

  FilesInput(event) {
    const { files: fileList } = event.target;
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
    const { uploadLimit, input, priview } = PhotosUpload;
    const { files: fileList } = input;

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

  removeOldPhoto(event){
  
    const photoDiv = event.target.parentNode

    if(photoDiv.id){
      const removeFiles = document.querySelector('input[name="removed_files"]')

      if(removeFiles){
        
        removeFiles.value  +=`${photoDiv.id},`
      }
    }

    photoDiv.remove()
  }
};
