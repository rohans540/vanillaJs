const charactersList = document.getElementById('charactersList');
const searchBar = document.getElementById('searchBar');
let hpChars = [];

searchBar.addEventListener('keyup', (e) => {
    const updatedChars = hpChars.filter(char => {
        const searchStr = e.target.value.toLowerCase();
        return char.name.toLowerCase().includes(searchStr) || char.house.toLowerCase().includes(searchStr);
    })
    displayCharacters(updatedChars);
})



async function fetchCharacters() {
    try {
        const resp = await fetch("http://hp-api.herokuapp.com/api/characters");
        hpChars = await resp.json();
        displayCharacters(hpChars);
        console.log(hpChars);
    } catch(error) {
        console.log(error);
    }
}

function displayCharacters(characters) {
    const html = characters.map(char => {
        return `
            <li class="character">
                <h2>${char.name}</h2>
                <p>House: ${char.house}</p>
                <img src="${char.image}"></img>
            </li>
        `
    })
    .join("");
    console.log(html);
    charactersList.innerHTML = html;
}

fetchCharacters();