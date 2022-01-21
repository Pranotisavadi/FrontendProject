const inputBox = document.getElementById("input");
const searchButton = document.getElementById("button");
const cardGroup = document.getElementById("card-group")
const moreInfo = document.getElementById("more-info")
const results = document.getElementById("results")
const genreSelection = document.getElementById("dropdownGenreButton")


let dropDownItem = document.querySelectorAll('.dropdown-item')
dropDownItem.forEach(item => {
  item.addEventListener('click', function(){
    this.closest('.dropdown').children[0].innerText = this.innerText
  })
})

searchButton.addEventListener("click", (e) => {
    e.preventDefault();
    let bookSubject = genreSelection.innerHTML;
    // console.log(bookSubject)
    const url = `https://www.googleapis.com/books/v1/volumes?q=subject:${bookSubject}&maxResults=40`
    console.log(url)
    fetch(url)
    .then((response) => response.json())
    .then(result => {
      console.log(result.items.length)
      for (i = 0; i < result.items.length; i++){
        let item = document.createElement("a");
        // console.log(result.items[i].volumeInfo.imageLinks.thumbnail)
        item.innerHTML += `<div class="card" style="width: 15rem;">
            <img src="${result.items[i].volumeInfo.imageLinks.thumbnail}" class="card-img-top img-fluid" alt="...">
            <div class="card-body">
            <h3 class="card-title overflow-hidden">${result.items[i].volumeInfo.title}</h3>
            <h5>by ${result.items[i].volumeInfo.authors[0]}</h5><br><h5 id="${result.items[i].id}" class="btn btn-primary btn-book btn-lg">Learn More</h5>
            </div>
            </div><br>`;
        document.getElementById("results").appendChild(item);
      }
})
.catch((error) => {
  console.log('This is the error:', error)
})
})

cardGroup.addEventListener("click", bookDetails)

function bookDetails(event){
   if (event.target.classList.contains("btn-book"))
      console.log(event.target.id)
      // cardGroup.innerHTML = ""
      fetch(`https://www.googleapis.com/books/v1/volumes/${event.target.id}`)
      .then((response) => response.json())
      .then(result => {
          console.log(result.volumeInfo)
          let item = document.createElement("a");
          item.innerHTML = `<div>
          <img src="${result.volumeInfo.imageLinks.thumbnail}" alt="...">
          <div class="card-body">
          <h3 class="card-title overflow-hidden">${result.volumeInfo.large}</h3>
          <h5>by ${result.volumeInfo.authors[0]}</h5><br><p>Plot: ${result.volumeInfo.description}</h5>
          </div>
          </div><br>`;
          document.getElementById("results").innerHTML = moreInfo.appendChild(item);
          let drinkButton = document.createElement("button")
          drinkButton.innerHTML = "Want a drink?"
          document.getElementById("results").innerHTML = moreInfo.appendChild(drinkButton);
      })
}
