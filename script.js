const url = `https://pokeapi.co/api/v2/pokemon`;
const target = document.querySelector(".pokemon");

const fetchData = async (url) => {
    const res = await fetch(url)
    const data = await res.json()

    let pokemons = data.results;

    for (let pokemon of pokemons) {
        const pokemonRes = await fetch(pokemon.url)
        const pokemonData = await pokemonRes.json()

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

fetchData(url)
