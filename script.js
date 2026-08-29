// @ts-nocheck

const BASE_URL = "https://pokeapi.co/api/v2/pokemon?limit=50&offset=0";
const subUrl = [];
const pokeData = [];


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
    let singlePokeDialog = document.getElementById("singlePokemonDialog");
    let pokemon = pokeData.find(pokemon => pokemon.id === id);

    singlePokeDialog.showModal();
    singlePokeDialog.innerHTML = getSinglePokemonDialogTemplate(pokemon);
}






