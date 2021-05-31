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
}