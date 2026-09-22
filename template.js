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
                    <button onclick="showMainInfo(${pokemon.id})" id="mainInfo" class="nav-con-btn">Main</button>
                    <div class="separator"></div>
                    <button onclick="showStatsInfo(${pokemon.id})" id="statsInfo" class="nav-con-btn">Stats</button>
                    <div class="separator"></div>
                    <button onclick="showEvoChain(${pokemon.id})" id="evoChainInfo" class="nav-con-btn">Evo Chain</button>
                </nav>

                <div id="dialogInfoCon" class="dialog-info-con">
                   
                </div>

                
                    
                
            </main>
    
    `
}

function getMainInfoTemplate(pokemon, index) {
    return `<div class="height-and-weight">
                <p class="height" id="pokemonHeight"></p>
                <p class="weight" id="pokemonWeight"></p>
                <p class="base-experience" id="baseExperience"></p>

                <div id="allAbilities" class="all-abilities">
                    <div id="abilitiesHeaderCon" class="abilities-header-con"></div>
                    <div id="abilitiesCon" class="abilities-con">
                                            
                    </div>
                </div>
            </div>
           `
}

function getAbilitiesHeaderTemplate() {
    return `<p class='abilities-header'><strong>Abilities: </strong></p>
           `
}

function getAbilitiesTemplate(pokemon, index) {
    return `<p id="abilities-${index}" class="abilities">${pokemon.abilities[index].ability.name}</p>
           `
}



function getStatsInfoTemplate(pokemon, index) {
    return `<div class="stats-con">
                <div class="stats-name-con"><strong>${pokemon.stats[index].stat.name.charAt(0).toUpperCase() + pokemon.stats[index].stat.name.slice(1)}</strong></div>
               
                <div class="status">
                    <div id="statusBar-${index}" class="status-bar" role="statusbar" style="width: 0%">
                        
                    </div>

                    <div class="stats-points">${pokemon.stats[index].base_stat}/${maxStats[index]}</div>
                </div>
                
            </div>


           

           

            



    
            `
}



