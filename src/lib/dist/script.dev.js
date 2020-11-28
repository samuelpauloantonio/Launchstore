"use strict";

//Funcao Alert Delete
function locations(edit) {
  var currentpage = document.location.pathname;

  if (currentpage.includes(edit)) {
    var formDelet = document.querySelector("#form-delete");
    formDelet.addEventListener("submit", function (event) {
      var confirmDelete = confirm("do you like delete this user ?");

      if (!confirmDelete) {
        event.preventDefault();
      }
    });
  }
}

locations("edit");
var Mask = {
  apply: function apply(input, func) {
    setTimeout(function () {
      input.value = Mask[func](input.value);
    }, 1);
  },
  formtAOA: function formtAOA(value) {
    value = value.replace(/\D/g, "");
    return new Intl.NumberFormat("AOA", {
      style: "currency",
      currency: "AKZ"
    }).format(value / 100);
  }
}; //upload Photos
//gerenciador de Photos

var PhotosUpload = {
  priview: document.querySelector("#photos-priview"),
  files: [],
  uploadLimit: 6,
  input: "",
  FilesInput: function FilesInput(event) {
    var fileList = event.target.files;
    PhotosUpload.input = event.target;
    if (PhotosUpload.hasLimit(event)) return;
    Array.from(fileList).forEach(function (file) {
      var reader = new FileReader();
      console.log(reader);
      PhotosUpload.files.push(file);

      reader.onload = function () {
        var image = new Image();
        image.src = String(reader.result);
        var div = PhotosUpload.getConteiner(image);
        PhotosUpload.priview.appendChild(div);
      };

      reader.readAsDataURL(file);
    });
    PhotosUpload.input.files = PhotosUpload.getAllFiles();
  },
  //colocar limite de Uploud de Photos
  hasLimit: function hasLimit(event) {
    var uploadLimit = PhotosUpload.uploadLimit,
        input = PhotosUpload.input,
        priview = PhotosUpload.priview;
    var fileList = input.files;

    if (fileList.length > uploadLimit) {
      alert("Envie no m\xE1ximo ".concat(uploadLimit, " fotos"));
      event.preventDefault();
      return true;
    }

    var photoDiv = [];
    priview.childNodes.forEach(function (item) {
      if (item.classList && item.classList.value == "photo") photoDiv.push(item);
    });
    var totalPhotos = fileList.length + photoDiv.length;

    if (totalPhotos > uploadLimit) {
      alert("Você atingiu o limite máximo de fotos");
      event.preventDefault();
      return true;
    }

    return false;
  },
  //Pega Todos as Photos carregadas apartir do DataTransfer do Google Chrome
  getAllFiles: function getAllFiles() {
    var dataTransfer = new ClipboardEvent("").clipboardData || new DataTransfer();
    PhotosUpload.files.forEach(function (file) {
      return dataTransfer.items.add(file);
    });
    return dataTransfer.files;
  },
  //Coloca a Photo na div
  getConteiner: function getConteiner(image) {
    var div = document.createElement("div");
    div.classList.add("photo");
    div.onclick = PhotosUpload.removePhotos;
    div.appendChild(image);
    div.appendChild(PhotosUpload.getRemoveButton());
    return div;
  },
  //Cria o Button de Remover as Photos com Material Icon
  getRemoveButton: function getRemoveButton() {
    var button = document.createElement("i");
    button.classList.add("material-icons");
    button.innerHTML = "close";
    return button;
  },
  //Evento de Remover Photos do Array ou do nosso Priview
  removePhotos: function removePhotos(event) {
    var photoDiv = event.target.parentNode;
    var photosArray = Array.from(PhotosUpload.priview.children);
    var index = photosArray.indexOf(photoDiv);
    PhotosUpload.files.splice(index, 1);
    PhotosUpload.input.files = PhotosUpload.getAllFiles();
    photoDiv.remove();
  },
  removeOldPhoto: function removeOldPhoto(event) {
    var photoDiv = event.target.parentNode;

    if (photoDiv.id) {
      var removeFiles = document.querySelector('input[name="removed_files"]');

      if (removeFiles) {
        removeFiles.value += "".concat(photoDiv.id, ",");
      }
    }

    photoDiv.remove();
  }
};
var imageGallery = {
  preview: document.querySelectorAll('.gallery-preview  > img'),
  highlight: document.querySelector('.highlight > img'),
  setImage: function setImage(event) {
    var target = event.target;
    imageGallery.preview.forEach(function (priview) {
      return priview.classList.remove('active');
    });
    target.classList.add('active');
    imageGallery.highlight.src = target.src;
    animationZoomImage.image.src = target.src;
  }
};
var animationZoomImage = {
  target: document.querySelector('.lightbox-target'),
  image: document.querySelector('.lightbox-target  img'),
  closeButton: document.querySelector('.lightboxClose'),
  open: function open() {
    animationZoomImage.target.style.opacity = 1;
    animationZoomImage.target.style.top = 0;
    animationZoomImage.target.style.visibility = "visible";
    animationZoomImage.closeButton.style.top = "-10px";
    animationZoomImage.closeButton.style.transition = "all ease-in 200ms";
  },
  close: function close() {
    animationZoomImage.target.style.opacity = 0;
    animationZoomImage.target.style.top = -"-100%";
    animationZoomImage.target.style.visibility = "hidden";
    animationZoomImage.closeButton.style.top = "-200px";
    animationZoomImage.closeButton.style.transition = "none";
  }
};