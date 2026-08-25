// @ts-nocheck

const BASE_URL = "https://pokeapi.co/api/v2/pokemon?limit=50&offset=0";
const subUrl = [];

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

    console.log(promises);
    renderPokemon(promises);
}

function renderPokemon(promises) {
    for (let index = 0; index < promises.length; index++) {
        let pokemon = promises[index];


        document.getElementById("singlePokeCard").innerHTML += getSinglePokemonTemplate(pokemon);
        let secondType = document.getElementsByClassName("second-type");
        
        if (secondType === "undefined") {


            document.getElementsByClassName("second-type").innerHTML = "";
        }

    }



}




