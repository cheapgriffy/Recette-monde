// hmtl node calls
const ELEMENTS = {
    search_input: document.querySelector("#searchInput"),
    receipes_root: document.querySelector("#recipesContainer"),
}

async function getData(url){
    const reponse = await fetch(url)
    const data = await reponse.json()
    return data
}

/**
 * Add all the elements to the recipes root
 */
async function init(){
    data = await getData("./assets/data/recette.json")
    
    data.recipes.forEach(element => {
        ELEMENTS.receipes_root.innerHTML += createCard(element)
    });
}

/**
 * Returns a card
 * @param {"recipes" object} card 
 * @returns stringified html element
 */
function createCard(card){

    let ingredient_part = document.createElement("ul")
    card.ingredients.forEach(element => {
        let added = document.createElement("li")
        added.innerHTML = `${element.quantity} ${element.unit} ${element.ingredient}`
        ingredient_part.appendChild(added)
    });

    let template_card = `
    <article class="recipe-card" id="${card.id}">
      <h2>${card.name}</h2>
      <p><strong>Nombre de personnes :</strong> ${card.servings}</p>
        ${ingredient_part.outerHTML}
    </article>
    `

    return template_card
}

// update recipes based on user query
ELEMENTS.search_input.addEventListener("input", async (e) => {
    ELEMENTS.receipes_root.innerHTML = ``

    data = await getData("./assets/data/recette.json")

    data.recipes = data.recipes.filter((recipe) => 
        recipe.name.toLowerCase().includes(ELEMENTS.search_input.value.toLowerCase())
    )
    console.log(data.recipe)

    // Render out query
    data.recipes.forEach(element => {
        ELEMENTS.receipes_root.innerHTML += createCard(element)
    });
    
})


//! Init calls
init()