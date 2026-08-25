// @ts-nocheck
function getSinglePokemonTemplate(pokemon) {
    return `<button class="thumbnail-buttons ${pokemon.types[0].type.name}">
                <p>${pokemon.id}</p>
                <h2>${pokemon.forms[0].name.charAt(0).toUpperCase() + pokemon.forms[0].name.slice(1)}</h2>
                <img src="${pokemon.sprites.versions["generation-viii"]["brilliant-diamond-shining-pearl"].front_default}">
                <p>${pokemon.types[0].type.name}</p>
                <p class="second-type">${pokemon.types[1]?.type.name}</p>
                
                
            </button>
            
            



`
}


