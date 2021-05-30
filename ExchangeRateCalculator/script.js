const currencyEle_one = document.getElementById('currency-one');
const currencyEle_two = document.getElementById('currency-two');
const amtOne = document.getElementById('amount-one');
const amtTwo = document.getElementById('amount-two');
const rateEle = document.getElementById('rate');
const swapBtn = document.getElementById('swap');


//Fetching exchange rates and update DOM
function calculate() {
    const currency_one = currencyEle_one.value;
    const currency_two = currencyEle_two.value;

    fetch(`https://v6.exchangerate-api.com/v6/05864c972f846da65bfcecc0/latest/${currency_one}`)
        .then(resp => resp.json())
        .then(data => {
            const rate = data.conversion_rates[currency_two];
            rateEle.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;

            amtTwo.value = (amtOne.value * rate).toFixed(2);
        })
}


//Event listeners
currencyEle_one.addEventListener('change', calculate);
amtOne.addEventListener('input', calculate);
currencyEle_two.addEventListener('change', calculate);
amtTwo.addEventListener('input', calculate);

swapBtn.addEventListener('click', () => {
    const temp = currencyEle_one.value;
    currencyEle_one.value = currencyEle_two.value;
    currencyEle_two.value = temp;
    calculate();
})

calculate();