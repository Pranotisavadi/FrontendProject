const searchButton = document.getElementById("genre-buttons");
const bookList = document.getElementById("book-list")
const randomDrink = document.getElementById("randomDrink")
const drinkInfo = document.getElementById("drinkInfo")

searchButton.addEventListener("click", (event) => {
    event.preventDefault();
    var bookSubject = event.target.id;
    const url = `https://www.googleapis.com/books/v1/volumes?q=subject:${bookSubject}&maxResults=40`;
    fetch(url)
    .then((response) => response.json())
    .then(result => {
      for (i = 0; i < result.items.length; i++){
        let item = document.createElement("a");
        item.innerHTML += `<div class="card book-cards" style="width: 20rem;">
            <img src="${result.items[i].volumeInfo.imageLinks.thumbnail}" class="card-img-top img-fluid" alt="..." style="width:85%" style="margin:auto" style="padding: 10px";">
            <div class="card-body" style="width: 18rem">
            <h3 class="card-title">${result.items[i].volumeInfo.title}</h3>
            <h5>by ${result.items[i].volumeInfo.authors[0]}</h5><br><h5 id="${result.items[i].id}" class="btn btn-primary btn-book btn-lg">More Info</h5>
            </div>
            </div><br>`;
        document.getElementById("book-list").appendChild(item);
        searchButton.innerHTML= ""
        document.getElementById("head2").innerHTML="Pick your favorite book!"
      }

})
.catch((error) => {
})

})

bookList.addEventListener("click", bookDetails);

function bookDetails(event){
   if (event.target.classList.contains("btn-book"))
      fetch(`https://www.googleapis.com/books/v1/volumes/${event.target.id}`)
      .then((response) => response.json())
      .then(result => {
          const drinkSelector= document.getElementById('drink-selector-hidden')
          drinkSelector.style.display="flex";

          document.getElementById("head2").innerHTML="Pair it with a drink!"

          let item = document.createElement("a");
          item.innerHTML = `<div class="card" style="width: 25rem;">
          <img src="${result.volumeInfo.imageLinks.thumbnail} "height: auto";
          "width: 100%"; class="card-img-top" alt="...">
          <div class="card-body scroll">
          <h3 class="card-title">${result.volumeInfo.title}</h3>
          <h5>by ${result.volumeInfo.authors[0]}</h5><br><p>Plot: ${result.volumeInfo.description}</h5>
          </div>
          </div>`;
          document.getElementById("book-list").innerHTML = "";
          document.getElementById("book-info").innerHTML = item.innerHTML;
               if (result.volumeInfo.categories[0].includes("Romance")){
                    drinkRecommendation("178338")
               } else if (result.volumeInfo.categories[0].includes("Thriller")){
                    drinkRecommendation("12388")
               } else if (result.volumeInfo.categories[0].includes("Fantasy")){
                    drinkRecommendation("178354")
               } else if (result.volumeInfo.categories[0].includes("Adventure")){
                    drinkRecommendation("11010")
               } else if (result.volumeInfo.categories[0].includes("History")){
                    drinkRecommendation("11991")
               } else if (result.volumeInfo.categories[0].includes("Biography")){
                    drinkRecommendation("178330")
               } else if (result.volumeInfo.categories[0].includes("Travel")){
                    drinkRecommendation("12214")
               } else if (result.volumeInfo.categories[0].includes("Science")){
                    drinkRecommendation("16984")
               } else if (result.volumeInfo.categories[0].includes("Fiction")){
                    drinkRecommendation("11001")
               } else {
                    drinkRecommendation("11009")
               }
          
      })
    .catch((error) => {
    console.log("Unable to get certain elements")})
}

function drinkRecommendation(id){
     fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
     .then(response => response.json())
     .then(data => {
          let recomendaDrink= `
          <div class="card p1" style="width: 25rem;">
          <img src="${data.drinks[0].strDrinkThumb} "height: auto";
          "width: 100%"; class="card-img-top" alt="...">
          <div class="card-body" id="drink-card">
          <h3 class="card-title">${data.drinks[0].strDrink}</h3>
          <div id="hidden-ingredient">
          <a id="${data.drinks[0].idDrink}" class="btn btn-primary">Ingredients <i class="fas fa-glass-martini-alt"></i></a>
          </div>
          </div>
          </div>;     
          `
          console.log(data.drinks.strDrink)
          randomDrink.innerHTML = recomendaDrink
     });
}

recommendation.addEventListener('click', (e) => {
     drinkInfo.innerHTML = "";
  fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php?a=Alcoholic')
     .then(response => response.json())
     .then(data => {
          renderRandomDrink(data.drinks)
     });
function renderRandomDrink(drinkData) {
     drinkData.map(drink => {
          let recomendaDrink= `
          
          <div class="card p1" style="width: 20rem;">
          <img src="${drink.strDrinkThumb} "height: auto";
          "width: 100%"; class="card-img-top" alt="...">
          <div class="card-body" id="drink-card">
          <h3 class="card-title">${drink.strDrink}</h3>
          <div id="hidden-ingredient">
          <a id="${drink.idDrink}" class="btn btn-primary">Ingredients <i class="fas fa-glass-martini-alt"></i></a>
          </div>
        
          </div>
          </div>;     
          `
          randomDrink.innerHTML = recomendaDrink;
     }); 
};

})


randomDrink.addEventListener('click', (e) => {
     if(e.target.className.includes('btn-primary')){
          console.log(e.target.id, "e.id");
          fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${e.target.id}`)
               .then(response => response.json())
               .then((singleDrink) => {
                    console.log(singleDrink)
                    console.log(singleDrink.drinks[0].strIngredient1)
                    let ingredients = [
                         singleDrink.drinks[0].strIngredient1,
                         singleDrink.drinks[0].strIngredient2,
                         singleDrink.drinks[0].strIngredient3,
                         singleDrink.drinks[0].strIngredient4,
                         singleDrink.drinks[0].strIngredient5,
                         singleDrink.drinks[0].strIngredient6,
                         singleDrink.drinks[0].strIngredient7,
                         singleDrink.drinks[0].strIngredient8,
                         singleDrink.drinks[0].strIngredient9,
                         singleDrink.drinks[0].strIngredient10,
                         singleDrink.drinks[0].strIngredient11,
                         singleDrink.drinks[0].strIngredient12,
                         singleDrink.drinks[0].strIngredient13,
                         singleDrink.drinks[0].strIngredient14,
                         singleDrink.drinks[0].strIngredient15,
                    ];
                    renderOneDrink(ingredients);

               }) 
     }    
}); 

function renderOneDrink(id) { 
  console.log(id)
  let aDrink = `
  <div class="oneDrinkDiv">
      
       <ul class="list-group list-group-flush" id="drink-ingredients">
       
       </ul>
  </div>`
  drinkInfo.innerHTML = aDrink;
  
const hiddenIngredient=document.getElementById('hidden-ingredient')
     hiddenIngredient.style.display="none";


  const drinkIngrediant = document.getElementById('drink-card'); 
  id.map(ingredient => {
       switch (ingredient) {
            case null:
                 break;
            case "":
                 break;
            default:
            let iList = `<li>${ingredient}</li>`
            
            drinkIngrediant.innerHTML += iList; 
       } 
  }) 
}