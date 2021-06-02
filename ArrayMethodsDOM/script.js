const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBt = document.getElementById('sort');
const calculateBtn = document.getElementById('calculate-wealth');

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

//Fetch random users and add money

async function getRandomUser() {
    const resp = await fetch('https://randomuser.me/api');
    const data  = await resp.json();

    const user = data.results[0];

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    }

    addData(newUser);
}

//Add new user to the data object
function addData(obj) {
    data.push(obj);

    updateDOM();
}

//update DOM
function updateDOM(providedData = data) {
    main.innerHTML = '<h2><Strong>Person</Strong> Wealth</h2>';

    providedData.forEach(item => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
        main.appendChild(element);
    })
}

function formatMoney(number) {
    return '$'+number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

addUserBtn.addEventListener('click', () => {
    getRandomUser();
})