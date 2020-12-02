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