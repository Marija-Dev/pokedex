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
    return `<main class"dialog-main">
                <div class="dialog-header">
                    <h2 class="dialog-poke-name">${pokemon.forms[0].name}</h2>
                    <button data-id="close-dialog-button" onclick="closeDialog()" class="close-dialog-x">X</button>
                </div>

                <div class="dialog-poke-img-con ${pokemon.types[0].type.name} ${pokemon.types[1]?.type.name}">
                    <img class="dialog-poke-img" src="${pokemon.sprites.versions["generation-viii"]["brilliant-diamond-shining-pearl"].front_default}">
                </div>

                <div class="dialog-type-con">
                    <p class="dialog-single-type ${pokemon.types[0].type.name}" id="dialogSingleType">${pokemon.types[0].type.name}</p>
                    <p class="dialog-second-type ${pokemon.types[1]?.type.name}" id="dialogSecondType-${pokemon.id}">${pokemon.types[1]?.type.name}</p>
                </div>

                <nav class="nav-con">
                    <a id="mainInfo" href="#">Main</a>
                    <a onclick="showStatsInfo()" id="statsInfo" href="#">Stats</a>
                    <a id="evoChainInfo" href="#">Evo Chain</a>
                </nav>

                
                
                <div class="dialog-info-con">
                    <p id="pokemonHeight"></p>
                    <p id="pokemonWeight"></p>
                    <p>Abilities: ${pokemon.abilities[0].ability.name}, 
                                  ${pokemon.abilities[1].ability.name}  
                                  <p class="last-ability" id="abilities-${pokemon.id}">,
                                        ${pokemon.abilities[2]?.ability.name}
                                  </p>
                    </p>
                    
                    
                </div>

            </main>
    
    `
}


function getStatsInfoTemplate(pokemon) {
    return `<p>${pokemon.stats[0].base_stat}</p>
    
    
    `
}



