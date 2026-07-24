const baseURL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/"
const dropdowns = document.querySelectorAll(".dropdown select")
let btn = document.querySelector(".btn")
let amount = document.querySelector(".amount input")
let input = document.querySelector("form input")
const from = document.querySelector(".from select")
const to = document.querySelector(".to select")
let msg = document.querySelector(".msg")


for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if(select.name == "from" && currCode == "USD"){
    newOption.selected = "selected"
    }else  if(select.name == "to" && currCode == "PKR"){
    newOption.selected = "selected"
    }   
     select.append(newOption);
  }
  select.addEventListener("change" , (evt)=>{
    updateFlag(evt.target)
})
}

const updateFlag =(element)=>{
    let currCode = element.value
    let countryCode = countryList[currCode]
    let newSrc = `https://flagsapi.com/${countryCode}/shiny/64.png`;
    let img = element.parentElement.querySelector("img")
    img.src = newSrc;
}
btn.addEventListener("click" , async (evt)=>{
    evt.preventDefault()
    let amtVal = amount.value;
    console.log(amtVal);
    if(amtVal == "" || amtVal <0){
        alert("invalid value")
        amtVal = 1;
        amount.value = 1;
    }
    console.log(from.value , to.value)
    const URL = `${baseURL}${from.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    const data = await response.json();
    const rate = data[from.value.toLowerCase()][to.value.toLowerCase()]
    console.log(rate)
    let finalAmt = amtVal*rate;
    console.log(finalAmt)
    msg.innerText = `${amtVal} ${from.value} = ${finalAmt} ${to.value}`
})