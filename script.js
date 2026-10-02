// @ts-nocheck

const BASE_URL = "https://pokeapi.co/api/v2/pokemon?limit=300&offset=0";
const EVO_CHAIN_URL = "https://pokeapi.co/api/v2/pokemon-species/?limit=300&offset=0";
const subUrl = [];
const pokeData = [];
const evoSubUrl = [];
const evoChainData = [];
const evoData = [];
const singlePokeDialog = document.getElementById("singlePokemonDialog");
let currentIndex = 20;
let singlePokeCard = document.getElementById("singlePokeCard");




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
    fetchEvoChain();
}

// NACH UNTEN VERSCHIEBEN 
async function fetchEvoChain() {
    let response = await fetch(EVO_CHAIN_URL);
    let responseToJson = await response.json();

    for (let index = 0; index < responseToJson.results.length; index++) {
        evoSubUrl.push(
            {
                url: responseToJson.results[index].url,
            }
        )
    }

    console.log("Evo Sub Url:", evoSubUrl);

    fetchEvoChainSubUrl();
}

async function fetchEvoChainSubUrl() {
    let evoChainSubUrlArray = evoSubUrl.map(item => item.url);
    let promises = await Promise.all(evoChainSubUrlArray.map(async url => {
        return (await fetch(url)).json();
    }));

    for (let index = 0; index < promises.length; index++) {
        evoChainData.push(promises[index]);
    }


    console.log("64:", evoChainData);


    fetchEvolutionData();
}

async function fetchEvolutionData() {
    let evoDataArray = evoChainData.map(item => item.evolution_chain.url);
    let promises = await Promise.all(evoDataArray.map(async url => {
        return (await fetch(url)).json();
    }));

    for (let index = 0; index < promises.length; index++) {
        evoData.push(promises[index]);
    }
}

console.log("Evo Chain Data", evoChainData);
console.log("88 EVO-DATA:", evoData);


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
    let promises = await Promise.all(subUrlArray.map(async url => {
        return (await fetch(url)).json();
    }));

    for (let index = 0; index < promises.length; index++) {
        pokeData.push(promises[index]);
    }

    renderPokemon(promises);
}

console.log("subUrl:", subUrl);



function renderPokemon(promises) {
    for (let index = 0; index < promises.length - 280; index++) {
        let pokemon = promises[index];

        singlePokeCard.innerHTML += getSinglePokemonTemplate(pokemon);
        hideUndefinedTypes(pokemon);
    }

    showLoadMoreButton();
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


function showMainInfo(id) {
    let pokemon = pokeData.find(pokemon => pokemon.id === id);
    let dialogInfoCon = document.getElementById("dialogInfoCon");


    dialogInfoCon.innerHTML = getMainInfoTemplate(pokemon);

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



function showStatsInfo(id) {
    let pokemon = pokeData.find(pokemon => pokemon.id === id);
    let allStats = pokemon.stats;
    document.getElementById("dialogInfoCon").innerHTML = "";

    for (let index = 0; index < allStats.length; index++) {
        let stats = pokemon.stats[index].base_stat;
        document.getElementById("dialogInfoCon").innerHTML += getStatsInfoTemplate(pokemon, index);

        statsBar(stats, index);
    }
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

function showEvoChain(index) {


    let pokemonIndex = evoData[index - 1];
    document.getElementById("dialogInfoCon").innerHTML = "";

    for (let index = 0; index < evoChainData.length; index++) {
        document.getElementById("dialogInfoCon").innerHTML = getEvoChainTemplate(pokemonIndex);
    }

    if (pokemonIndex.chain.evolves_to[0].evolves_to[0]?.species.name === undefined) {
        document.getElementById("lastEvoLevel").innerHTML = "";
    }

    showEvoChainImages(index);
}

function showEvoChainImages(index) {
    // let pokemon = pokeData.find(pokemon => pokemon.id === id);
    let pokemon = pokeData[index - 1];

    for (let index = 0; index < pokeData.length; index++) {
        document.getElementById("evoImagesCon").innerHTML = getEvoChainImagesTemplate(pokemon);

    }
}

function findPokemon() {
    let inputValue = document.getElementById("inputField").value.toLowerCase();
    let pokemon = pokeData.filter(pokemon => pokemon.forms[0].name.toLowerCase().startsWith(inputValue));
    singlePokeCard.innerHTML = "";
    document.getElementById("pokemonResultsContainer").innerHTML = "";

    if (inputValue.length < 3) {
        renderPokemon(pokeData);

        return
    }

    findSinglePokemon(pokemon);
    findPokemonHelper(pokemon);
    hideLoadMoreBtn(currentIndex + 10);
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

console.log(pokeData);


function loadMore() {
    let limit = pokeData.length;
    let addPokemon = 10;
    let nextIndex = currentIndex + addPokemon;

    for (let index = currentIndex; index < nextIndex && index < limit; index++) {
        let pokemon = pokeData[index];
        singlePokeCard.innerHTML += getSinglePokemonTemplate(pokemon);
        hideUndefinedTypes(pokemon);
    }

    currentIndex = nextIndex;
    hideLoadMoreBtn(nextIndex);
}

function hideLoadMoreBtn(nextIndex) {
    let loadMoreButton = document.getElementById("loadMore");
    let inputValue = document.getElementById("inputField").value;

    if (nextIndex >= pokeData.length || inputValue.length >= 3) {
        loadMoreButton.style = "display: none";
    }
}

function showLoadMoreButton() {
    let loadMoreCon = document.getElementById("loadMoreCon");

    loadMoreCon.innerHTML = getLoadMoreTemplate();
}


