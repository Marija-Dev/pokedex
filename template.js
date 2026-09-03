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
                    <h2># ${pokemon.id}</h2>
                    <h2 class="dialog-poke-name">${pokemon.forms[0].name.charAt(0).toUpperCase() + pokemon.forms[0].name.slice(1)}</h2>
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
                    <button onclick="showMainInfo(${pokemon.id})" id="mainInfo">Main</button>
                    <button onclick="showStatsInfo(${pokemon.id})" id="statsInfo">Stats</button>
                    <button onclick="showEvoChain(${pokemon.id})" id="evoChainInfo">Evo Chain</button>
                </nav>

                <div id="dialogInfoCon" class="dialog-info-con">
                    
                </div>

            </main>
    
    `
}

function getMainInfoTemplate(pokemon) {
    return `<p id="pokemonHeight"></p>
            <p id="pokemonWeight"></p>
            <p>Abilities: ${pokemon.abilities[0].ability.name},
                          ${pokemon.abilities[1].ability.name}
                <p class="last-ability" id="abilities-${pokemon.id}">,
                    ${pokemon.abilities[2]?.ability.name}
                </p>
            </p>
            `
}



function getStatsInfoTemplate(pokemon, index) {
    return `<div class="stats-con">
                <p>${pokemon.stats[index].stat.name.charAt(0).toUpperCase() + pokemon.stats[index].stat.name.slice(1)}</p>
                
                <div class="status">
                    <div id="statusBar-${index}" class="status-bar" role="statusbar" style="width: 0%">
                        <p class="stats-points">${pokemon.stats[index].base_stat}</p>
                    </div>
                </div>
            </div>


           

           

            



    
            `
}



