const url = `https://pokeapi.co/api/v2/pokemon`
const target = document.querySelector(".pokemon")
let offset = 0

const fetchData = async (url) => {
    const res = await fetch(`${url}?offset=${offset}`)
    const data = await res.json()

    let pokemons = data.results

    const pokePromise = pokemons.map(pokemon => fetch(pokemon.url).then(res => res.json()))
    const pokemonArray = await Promise.all(pokePromise)

    for (let i = 0; i < pokemons.length; i++) {
        const pokemon = pokemons[i]
        const pokemonData = pokemonArray[i]

        const numberPokemon = pokemon.url.split("/").slice(-2,-1)[0]
        const imageFront = pokemonData.sprites.front_default
        const types = pokemonData.types.map(type => type.type.name)
        const pokemonNameUpperCase = `${pokemon.name.charAt(0).toUpperCase()}${pokemon.name.slice(1)}`

        let template = document.createElement("div")
        template.innerHTML = `
            <div class="card">
                <img src=${imageFront} alt=${pokemon.name}>
                <h3 class="numero">N° ${numberPokemon}</h3>
                <h1>${pokemonNameUpperCase}</h1>
                <div class="type">
                    <h3 class="type-name">${types.join(' - ')}</h3>
                </div>
            </div>
        `;

        target.append(template)
    }
}


    const loadMoreData = () => {
        offset += 20
        fetchData(url, offset)
    }




    // const buttonContainer = document.createElement('div')
    // buttonContainer.classList.add('button-container')

    // const loadMore = document.createElement('button')
    // loadMore.innerText = 'Load more...'
    const loadMore = document.querySelector('.load-btn')

    loadMore.addEventListener('click', loadMoreData)

    // buttonContainer.append(loadMore)


    // target.append(buttonContainer)


fetchData(url, offset)




const search = document.querySelector('input')


search.addEventListener('input', () => {
    setTimeout(()=> {
        const pokemonCards = document.querySelectorAll('.card')

        const searchByName = search.value.trim().toLowerCase()
    
        for (const card of pokemonCards) {
            const pokemonName = card.querySelector('h1').innerText.toLowerCase()
    
            if (pokemonName.includes(searchByName)) {
                card.classList.remove('hidden')
            } else {
                card.classList.add('hidden')
            }
        }
    }, 1200)
   
})
