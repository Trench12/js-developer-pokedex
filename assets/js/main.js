const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const pokemonContent = document.getElementById('pokemonContent')
const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
            <button class="pokeClick" type="button" data-number="${pokemon.number}">
              Ver detalhes
            </button>
        </li>
    `

}

function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
      const newHtml = pokemons.map(convertPokemonToLi).join('')
      pokemonList.innerHTML += newHtml
      
      // Adicionar event listeners para os novos botões
      document.querySelectorAll('.pokeClick').forEach(button => {
          button.addEventListener('click', handleClick)
      })
  })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

function seeDetails(pokemon){
  return`
      <div class="detailsHeader">
        <img class="detailPhoto" src="${pokemon.photo}"
        alt="${pokemon.name}">
      </div>
      <div class="detailsContent">
          <div class="abilities">
          <h3>Abilities</h3>
          <ol class="ability">
          ${pokemon.abilities.map((ability) => `<li class="type ${ability}">${ability}</li>`).join('')}
          </ol>
          </div>
          <div class="stats">
          <h3>Stats</h3>
          <ol class="stat">
          ${pokemon.stats.map((stat) => `<li class="type ${stat.name}">${stat.name}: ${stat.value}</li>`).join('')}
          </ol>
          </div>
      </div>
  `

}

function handleClick(event) {
  const pokemonNumber = event.target.getAttribute('data-number')
  console.log(pokemonNumber);
  pokeApi.getPokemonById(pokemonNumber).then((pokemon) => {
    const detailsHtml = seeDetails(pokemon)
    pokemonContent.innerHTML = '';
    pokemonContent.innerHTML += detailsHtml
  })}
