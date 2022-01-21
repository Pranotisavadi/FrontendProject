const oneDrink = document.getElementById('oneDrink')

fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php?a=Alcoholic')
     .then(response => response.json())
     .then(data => {
          renderDrinks(data.drinks)
     });
function renderDrinks(drinkData) {
     drinkData.map(drink => {
          let drinklist= `
          <div class='drinksMenu'>
               <img src="${drink.strDrinkThumb}" class="imgs" alt='${drink.strDrink}' style="width: 200px; display: flex">
               <div class='drinkIngrediant'>
                    <h3 id='drinkName'>${drink.strDrink}</h3>
                    <a id="${drink.idDrink}" class="btn btn-primary">Try Me <i class="fas fa-glass-martini-alt"></i></a>
               </div>
          </div>      
          `
     allDrinks.innerHTML += drinklist;
     }); 
};
allDrinks.addEventListener('click', (e) => {
     if(e.target.className.includes('btn-primary')){
          console.log(e.target.id, "e.id"); //testing if we are targeting the id to call the other API
          fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${e.target.id}`)
               .then(response => response.json())
               .then((singleDrink) => {
                    console.log(singleDrink)
                    console.log(singleDrink.drinks[0].strIngredient1) //testing if we fetch the other API
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
          <h3> Ingredients </h3>
          <ul class="list-group list-group-flush" id="drink-ingredients">
          
          </ul>
     </div>`
     oneDrink.innerHTML = aDrink;
     const drinkIngrediant = document.getElementById('drink-ingredients'); 
     id.map(ingredient => {
          switch (ingredient) {
               case null:
                    break;
               case "":
                    break;
               default:
               console.log(ingredient)
               let iList = `<li>${ingredient}</li>`
               drinkIngrediant.innerHTML += iList; 
          } 
     }) 
}