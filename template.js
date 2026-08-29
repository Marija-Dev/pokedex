// @ts-nocheck
function getSinglePokemonTemplate(pokemon) {
    return `<button onclick="openSinglePokemonDialog(${pokemon.id})" class="thumbnail-buttons ${pokemon.types[0].type.name} ${pokemon.types[1]?.type.name}">
                <div class="pokemon-name-con">
                    <h2># ${pokemon.id}</h2>
                    <h2>${pokemon.forms[0].name.charAt(0).toUpperCase() + pokemon.forms[0].name.slice(1)}</h2>
                </div>

                <div class="poke-img-con">
                    <img class="poke-img" src="${pokemon.sprites.versions["generation-viii"]["brilliant-diamond-shining-pearl"].front_default}">
                </div>

                <div class="type-con">
                    <p class="single-type ${pokemon.types[0].type.name}">${pokemon.types[0].type.name}</p>
                    <p class="second-type ${pokemon.types[1]?.type.name}" id="secondType-${pokemon.id}">${pokemon.types[1]?.type.name}</p>
                </div>
            </button>
           `
}

function getSinglePokemonDialogTemplate(pokemon) {
    return `<h2>${pokemon.forms[0].name}</h2>
    
    
            <div class="poke-img-con">
                <img class="poke-img" src="${pokemon.sprites.versions["generation-viii"]["brilliant-diamond-shining-pearl"].front_default}">
            </div>
    
    
    `
}


