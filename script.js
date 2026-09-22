// @ts-nocheck

const BASE_URL = "https://pokeapi.co/api/v2/pokemon?limit=300&offset=0";
const subUrl = [];
const pokeData = [];
const singlePokeDialog = document.getElementById("singlePokemonDialog");


function init() {
    showLoadingSpinner();

}

function showLoadingSpinner() {
    let loadingSpinner = document.getElementById("loadingSpinner");
    loadingSpinner.classList.remove("hidden");

    setTimeout(() => {
        loadingSpinner.classList.add("hidden")
    }, 3000);

    fetchPokemon();
}

async function fetchPokemon() {
    let response = await fetch(BASE_URL);
    let responseToJson = await response.json();

    for (let index = 0; index < responseToJson.results.length; index++) {
        subUrl.push(
            {
                url: responseToJson.results[index].url,
            }
        )
    }

    fetchSubURLs();
}

async function fetchSubURLs() {
    let subUrlArray = subUrl.map(item => item.url);
    let response = subUrlArray.map(async url => {
        const resp = await fetch(url);
        return await resp.json();
    });
    let promises = await Promise.all(response);

    for (let index = 0; index < promises.length; index++) {
        pokeData.push(promises[index]);
    }



    renderPokemon(promises);


}




function renderPokemon(promises) {
    for (let index = 0; index < promises.length - 280; index++) {
        let pokemon = promises[index];

        document.getElementById("singlePokeCard").innerHTML += getSinglePokemonTemplate(pokemon);
        hideUndefinedTypes(pokemon);
    }


}

function hideUndefinedTypes(pokemon) {
    if (pokemon.types[1] === undefined) {
        document.getElementById(`secondType-${pokemon.id}`).innerHTML = "";
    }
}


function openSinglePokemonDialog(id) {
    let pokemon = pokeData.find(pokemon => pokemon.id === id);

    singlePokeDialog.showModal();
    singlePokeDialog.innerHTML = getSinglePokemonDialogTemplate(pokemon);

    if (pokemon.types[1] === undefined) {
        document.getElementById(`dialogSecondType-${pokemon.id}`).innerHTML = "";
        document.getElementById(`dialogSecondType-${pokemon.id}`).style = "border: none";
    }

    showMainInfo(id);
}

function closeDialog() {
    singlePokeDialog.close();
}


function showMainInfo(id, index) {
    let pokemon = pokeData.find(pokemon => pokemon.id === id);
    let dialogInfoCon = document.getElementById("dialogInfoCon");


    dialogInfoCon.innerHTML = getMainInfoTemplate(pokemon, index);

    calculateHeightAndWeight(pokemon);
    showAbilities(pokemon);
}


function calculateHeightAndWeight(pokemon) {
    let height = document.getElementById("pokemonHeight");
    let heightCM = pokemon.height / 10;
    let weight = document.getElementById("pokemonWeight");
    let weightKG = pokemon.weight / 10;
    let baseExperience = document.getElementById("baseExperience");

    height.innerHTML = ("<strong>Height: </strong>" + heightCM + " m").replace(".", ",");
    weight.innerHTML = ("<strong>Weight: </strong>" + weightKG + " kg").replace(".", ",");
    baseExperience.innerHTML = "<strong>Base experience: </strong>" + pokemon.base_experience;
}

function showAbilities(pokemon) {
    let allAbilities = pokemon.abilities;
    document.getElementById("abilitiesHeaderCon").innerHTML = getAbilitiesHeaderTemplate();

    for (let index = 0; index < allAbilities.length; index++) {
        document.getElementById("abilitiesCon").innerHTML += getAbilitiesTemplate(pokemon, index);

        if (index < allAbilities.length - 1) {
            document.getElementById(`abilities-${index}`).innerHTML += ",";
        } else if (pokemon.abilities[index] === undefined) {
            document.getElementById(`abilities-${index}`).innerHTML = "";
        }
    }
}



function showStatsInfo(id, index) {
    let pokemon = pokeData.find(pokemon => pokemon.id === id);
    let allStats = pokemon.stats;
    document.getElementById("dialogInfoCon").innerHTML = "";

    for (let index = 0; index < allStats.length; index++) {
        let stats = pokemon.stats[index].base_stat;
        document.getElementById("dialogInfoCon").innerHTML += getStatsInfoTemplate(pokemon, index);

        statsBar(stats, index);
    }

    console.log(allStats);

}

let maxStats = [255, 180, 230, 194, 230, 180];

function statsBar(stats, index) {
    let singleStat = maxStats[index];

    if (stats === singleStat) {
        document.getElementById(`statusBar-${index}`).style = "width: 100%";
    } else {
        document.getElementById(`statusBar-${index}`).style = `width: ${(stats / singleStat) * 100}%`;
    }
}

function showEvoChain() {

}

function findPokemon() {
    let inputValue = document.getElementById("inputField").value.toLowerCase();
    let pokemon = pokeData.filter(pokemon => pokemon.forms[0].name.toLowerCase().startsWith(inputValue));
    document.getElementById("singlePokeCard").innerHTML = "";
    document.getElementById("pokemonResultsContainer").innerHTML = "";

    if (inputValue.length < 3) {
        renderPokemon(pokeData);
        console.log(pokeData);
        return
    }

    findSinglePokemon(pokemon);
    findPokemonHelper(pokemon);
}

function findSinglePokemon(pokemon) {
    if (pokemon.length === 1) {
        document.getElementById("pokemonResultsContainer").innerHTML = getSinglePokemonTemplate(pokemon[0]);
    }
}

function findPokemonHelper(pokemon) {
    for (let index = 0; index < pokemon.length; index++) {
        let singlepokemon = pokemon[index];

        if (pokemon.length > 1) {
            document.getElementById("pokemonResultsContainer").innerHTML += getSinglePokemonTemplate(singlepokemon);
        }
        hideUndefinedTypes(singlepokemon);
    }
    findPokemonInputEmpty(pokemon);
}

function findPokemonInputEmpty(pokemon) {
    if (pokemon.length === 0) {
        document.getElementById("pokemonResultsContainer").innerHTML = "Pokemon not found";
    }

}



function loadMore(promises) {
    let loadMoreButton = document.getElementById("loadMore");
    let singlePokeCard = document.getElementById("singlePokeCard");
    let limit = 300;
    let addPokemon = 10;
    let maxPages = limit / addPokemon;
    let currentPage = 0;

    for (let index = 0; index < addPokemon < pokeData.length; index++) {
        let poki = pokeData[index];
        
        singlePokeCard.innerHTML += getSinglePokemonTemplate(poki);
        
    }

    currentPage + 10;

    




}


