// @ts-nocheck

const BASE_URL = "https://pokeapi.co/api/v2/pokemon?limit=100&offset=0";
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
        fetchPokemon();
    }, 3000);


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
    for (let index = 0; index < promises.length; index++) {
        let pokemon = promises[index];

        document.getElementById("singlePokeCard").innerHTML += getSinglePokemonTemplate(pokemon);

        if (pokemon.types[1] === undefined) {
            document.getElementById(`secondType-${pokemon.id}`).innerHTML = "";
        }
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

console.log(pokeData);




function calculateHeightAndWeight(pokemon) {
    let height = document.getElementById("pokemonHeight");
    let heightCM = pokemon.height / 10;
    let weight = document.getElementById("pokemonWeight");
    let weightKG = pokemon.weight / 10;

    height.innerHTML = "Height: " + heightCM + " m";
    weight.innerHTML = "Weight: " + weightKG + " kg"
}





function showMainInfo(id, index) {
    let pokemon = pokeData.find(pokemon => pokemon.id === id);
    let dialogInfoCon = document.getElementById("dialogInfoCon");

    // dialogInfoCon.innerHTML = "";
    dialogInfoCon.innerHTML = getMainInfoTemplate(pokemon, index);

    calculateHeightAndWeight(pokemon);
    showAbilities(pokemon);
}

function showAbilities(pokemon, index) {
    let allAbilities = pokemon.abilities;
    let abilitiesCon = document.getElementById("abilitiesCon");
    abilitiesCon.innerHTML = "Abilities: ";

    for (let index = 0; index < allAbilities.length; index++) {
        abilitiesCon.innerHTML += getAbilitiesTemplate(pokemon, index);

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
    document.getElementById("abilitiesCon").innerHTML = "";

    for (let index = 0; index < allStats.length; index++) {
        let stats = pokemon.stats[index].base_stat;
        document.getElementById("dialogInfoCon").innerHTML += getStatsInfoTemplate(pokemon, index);

        if (stats === 255) {
            document.getElementById(`statusBar-${index}`).style = "width: 100%";
        } else {
            document.getElementById(`statusBar-${index}`).style = `width: ${(stats / 255) * 100}%`;
        }
    }
}

function showEvoChain() {

}

function findPokemon(name, index) {
    let inputValue = document.getElementById("inputField").value.toLowerCase();
    let pokemon = pokeData.find(pokemon => pokemon.forms[0].name.toLowerCase() === inputValue);
    let singlePokeCard = document.getElementById("singlePokeCard");
    let pokemonResultsContainer = document.getElementById("pokemonResultsContainer");

    // if (!pokemon) {
    //     pokemonResultsContainer.innerHTML = "Pokemon nicht gefunden";
    // } else if (pokemon.name === inputValue) {
    //     singlePokeCard.innerHTML = "";
    //     pokemonResultsContainer.innerHTML = getSinglePokemonTemplate(pokemon);
    // }




    if (pokemon) {
        singlePokeCard.innerHTML = "";
        pokemonResultsContainer.innerHTML = getSinglePokemonTemplate(pokemon);
    } else if (!pokemon) {
        singlePokeCard.innerHTML = "";
        pokemonResultsContainer.innerHTML = "Pokemon nicht gefunden";
    } else if (inputValue === "") {
        singlePokeCard.innerHTML = getSinglePokemonTemplate(pokemon);
    }
}

















