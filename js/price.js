const cars = document.querySelector("#car")
const durations = document.querySelector("#duration")
const bringing = document.querySelector("#bringing")
const insurance = document.querySelector("#insurance")
const btnPrice = document.querySelector("#price_check")
const spanContainer = document.querySelector("#spanContainer")


btnPrice.onclick = () => {
    if(Number(cars.value) < 1 || Number(durations.value) < 1 || Number(bringing.value) < 0 || Number(insurance.value) < 0) {
        alert("Pick from the list")
    } else {
        const price = Number(cars.value) + Number(durations.value) + Number(bringing.value) + Number(insurance.value)
        spanContainer.innerHTML =
        "<div id='price_container'>" + 
        "<span id='price'>" + price + " <img id='euro' src='./images/euro-coin1.svg'></span>" +
        "<a href='./contact.html'><button id='contact_us'>Contact Us</button></a>" +
      "</div>"
    }
}

im