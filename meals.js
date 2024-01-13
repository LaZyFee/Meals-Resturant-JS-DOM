const mealsData = (search) => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
    fetch(url)
        .then(res => res.json())
        // .then(data => console.log(data.meals))
        .then(data => displayMeals(data.meals))
}

const displayMeals = meals => {

    const mealsContainer = document.getElementById('meals-container');
    mealsContainer.innerHTML = ``;
    meals.forEach(meal => {

        const mealsDiv = document.createElement('div');
        mealsDiv.classList.add('col');
        mealsDiv.innerHTML = `
                <div class="card h-100" onclick="loadMealDetails(${meal.idMeal})">
                    <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${meal.strMeal}</h5>
                        <p class="card-text">${meal.strInstructions.slice(0, 300)}</p>
                    </div>
                    </div>
                    `;
        mealsContainer.appendChild(mealsDiv);
    });


}
const searchFood = () => {
    const searchData = document.getElementById('search-field');
    const searchText = searchData.value;
    mealsData(searchText);
    searchData.value = '';
}
const loadMealDetails = (idMeal) => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
    // console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(data => displayMealsDetails(data.meals[0]))

}
const displayMealsDetails = meal => {
    const detailContainer = document.getElementById('detail-container')
    detailContainer.innerHTML = ``
    const mealDiv = document.createElement('div')
    mealDiv.classList.add('card', 'mb-5',)
    mealDiv.innerHTML = `
    <h2 class="text-center">Meal details</h2>
    <div class="row g-0">
    <div class="col-md-4">
      <img src="${meal.strMealThumb}" class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${meal.strMeal}</h5>
        <p class="card-text">${meal.strInstructions}</p>
        
      </div>
    </div>
  </div>

    `;
    detailContainer.appendChild(mealDiv);

}