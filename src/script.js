function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  //*console.log(searchInput.value);*//
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = searchInput.value;
}

let searchFormElement = document.querySelector("#search-form");
//*console.log(searchFormElement);*//
searchFormElement.addEventListener("submit", handleSearchSubmit);
