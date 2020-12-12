


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
