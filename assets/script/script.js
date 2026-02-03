// hmtl node calls
const ELEMENTS = {
    search_input: document.querySelector("#searchInput"),
    receipes_root: document.querySelector("#recipesContainer"),
    root: document.querySelector("body"),
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
    
    let cards_array = document.querySelectorAll("article")
    cards_array.forEach((element, index) => {
        element.addEventListener("click", (e) => {
            fullScreenPreview(data.recipes.filter((recipe) => recipe.id == element.id)[0])
        })
    });
}

/**
 * Returns a card
 * @param {"recipes" object} card 
 * @returns stringified html element
 */
function createCard(card){

    // Set list of ingredient => inside a html element
    let ingredient_part = document.createElement("ul")
    card.ingredients.forEach(element => {
        let added = document.createElement("li")
        added.innerHTML = `${element.quantity} ${element.unit} ${element.ingredient}`
        ingredient_part.appendChild(added)
    });

    // summon list on card template
    let template_card = `
    <article class="recipe-card" id="${card.id}">
      <h2>${card.name}</h2>
      <p><strong>Nombre de personnes :</strong> ${card.servings}</p>
        ${ingredient_part.outerHTML}
    </article>
    `

    return template_card
}

/**
 * Create a modal, cause i though it would be funny to do it in js
 * @param {speicif recipe object} card_oject 
 */
function fullScreenPreview(card_oject){
    let darken_span = document.createElement("span")
    let preview_root = document.createElement("div")
    preview_root.classList.add("full-screen-preview")
    darken_span.classList.add("darken")

    // Handle appear animation
    darken_span.style.animation = "appear-no-zoom ease 0.5s"
    preview_root.style.animation = "appear ease 0.3s"
    setTimeout(() => {
        darken_span.style.animation = ""
        preview_root.style.animation = ""
    }, 400)

    // ingredient management
    let ingredient_list = document.createElement("ul")
    card_oject.ingredients.forEach(element => {
        let added = document.createElement("li")
        added.innerHTML = `${element.quantity} ${element.unit} ${element.ingredient}`
        ingredient_list.appendChild(added)
    });

    //apply template
    preview_root.innerHTML = `
        <h2>${card_oject.name}</h2>
        <p><strong>Temp necesaire a la preparation</strong> ${card_oject.time} minutes</p>
        <p><strong>Nombre de personnes :</strong> ${card_oject.servings}</p>
        ${ingredient_list.outerHTML}
        <h2>Description :</h2>
        <p>${card_oject.description}.</p>
        <p><strong>Conteneur</strong> ${card_oject.appliance}<p>
        <p><strong>Ustensiles</strong> ${card_oject.ustensils}<p>
    `

    //summon on body
    ELEMENTS.root.appendChild(preview_root)
    ELEMENTS.root.appendChild(darken_span)

    // Handle card close //! Click outside to close
    darken_span.addEventListener("click", (e) => {
        // play disapeaur before destruction
        darken_span.style.animation = "disappear ease 0.3s"
        preview_root.style.animation = "disappear ease 0.3s"
        setTimeout(() => {
            preview_root.remove()
            darken_span.remove()
        }, 250)
    })
}

// update recipes based on user query
ELEMENTS.search_input.addEventListener("input", async (e) => {
    ELEMENTS.receipes_root.innerHTML = ``

    data = await getData("./assets/data/recette.json")
    
    // filter out
    data.recipes = data.recipes.filter((recipe) => 
        recipe.name.toLowerCase().includes(ELEMENTS.search_input.value.toLowerCase())
    )

    // Render out
    data.recipes.forEach(element => {
        ELEMENTS.receipes_root.innerHTML += createCard(element)
    });  

    let cards_array = document.querySelectorAll("article")
    cards_array.forEach((element, index) => {
        element.addEventListener("click", (e) => {
            fullScreenPreview(data.recipes.filter((recipe) => recipe.id == element.id)[0])
        })
    });
})


//! Init calls
init()