//Variables
const form = document.getElementById("request-quote");
const result = document.getElementById("result");

//Event Listeners
document.addEventListener("DOMContentLoaded", () => {
  // html.displayYears();
});

//adding years to the form
let yearsToSelect = [];
let currentYear = new Date().getFullYear();
for (
  let years = new Date().getFullYear() - 20;
  years < new Date().getFullYear() + 1;
  years++
) {
  yearsToSelect.push(years);
  
}

yearsToSelect.forEach((years) => {
    let year = document.getElementById("year");
    const node = document.createElement("option");
    node.setAttribute("value",years)
    const textnode = document.createTextNode(years);
    node.appendChild(textnode);
    year.appendChild(node);
  });

form.addEventListener("submit", (e) => {
  e.preventDefault();
  //Read the values from the FORM
  const make = document.getElementById("make").value; // const make = document.getElementById('make'); const selectedMake = make.options[make.selectedIndex].value;
  const year = document.getElementById("year");
  const selectedYear = year.options[year.selectedIndex].value;
  //Read the radio buttons
  const level = document.querySelector('input[name="level"]:checked').value;
  //Check that all fields have something selected
  if (make == "" || selectedYear == "" || level == "") {
    result.innerHTML = "";
    displayError("All the fields are mandatory!");
  } else {
    const insurance = {
      make: make,
      year: selectedYear,
      level: level,
    };
    const price = calculateQuotation(insurance);
    console.log(price);
    showResults(price, insurance);
  }
});

//Functions
function displayError(message) {
  //Create a div
  const div = document.createElement("div");
  div.classList = "error";
  //Insert the message
  div.innerHTML = `<p>${message}</p>`;
  form.insertBefore(div, document.querySelector(".form-group"));
}

function calculateQuotation(insurance) {
  let price;
  const base = 2000;
  //Get the make
  const make = insurance.make;
  /*
        1= American 15%
        2= Asian 05%
        3= European 35% 
    */
  switch (make) {
    case "1":
      price = base * 1.15;
      break;
    case "2":
      price = base * 1.05;
      break;
    case "3":
      price = base * 1.35;
      break;
  }
  //Get the year
  const year = insurance.year;
  //Get the year difference
  const difference = new Date().getFullYear() - year;
  //Each year the cost of the insurance is going to be 3% cheaper
  price = price - (difference * 3 * price) / 100;
  //Check the level of protection
  const level = insurance.level;
  price = calculateLevel(price, level);
  return price;
}

function calculateLevel(price, level) {
  /*
        Basic insurance is going to increase the value by 30%
        Complete insurance ig going to increase the value by 50%
    */
  if (level == "basic") {
    price = price * 1.3;
  } else {
    price = price * 1.5;
  }
  return price;
}
function showResults(price, insurance) {
  //Create a div with the results
  const div = document.createElement("div");
  //Get make from the object and assign a readable name
  let make = insurance.make;
  switch (make) {
    case "1":
      make = "America";
      break;
    case "2":
      make = "Asian";
      break;
    case "3":
      make = "European";
      break;
  }
  if (result.innerHTML != "") {
    // Claer the previous result
    result.innerHTML = "";
    //Print the results
    div.innerHTML = `
            <p class = "header">Summary</p>
            <p>Make: ${make}</p>
            <p>Year: ${insurance.year}</p>
            <p>Level: ${insurance.level}</p>
            <p class="total">Total: $ ${price}
        `;
    //Showing loading Spinner gif before the result
    const spinner = document.querySelector("#loading img");
    spinner.style.display = "block";
    setTimeout(() => {
      spinner.style.display = "none";
      //Insert this into HTML
      result.appendChild(div);
    }, 2500);
  } else {
    //Print the results
    div.innerHTML = `
            <p class = "header">Summary</p>
            <p>Make: ${make}</p>
            <p>Year: ${insurance.year}</p>
            <p>Level: ${insurance.level}</p>
            <p class="total">Total: $ ${price}
        `;
    //Showing loading Spinner gif before the result
    const spinner = document.querySelector("#loading img");
    spinner.style.display = "block";
    setTimeout(() => {
      spinner.style.display = "none";
      //Insert this into HTML
      result.appendChild(div);
    }, 2500);
  }
}
