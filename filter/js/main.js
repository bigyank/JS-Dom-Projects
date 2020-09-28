const countriesApi = "https://restcountries.eu/rest/v2/all";
let isLoading = true;
const allCountries = [];

const searchInput = document.querySelector(".search");
const suggestions = document.querySelector(".suggestions");
const proTip = document.querySelector(".pro-tip");

async function getCountries() {
  const response = await fetch(countriesApi);
  const countries = await response.json();
  allCountries.push(...countries);
  isLoading = false;
}

function matchCountry(name, allCountries) {
  const matched = allCountries.filter(
    (country) =>
      country.name.toLowerCase().includes(name.toLowerCase()) ||
      country.capital.toLowerCase().includes(name.toLowerCase())
  );
  return matched;
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function displayMatched({ target }) {
  proTip.style.visibility = "visible";
  const input = target.value;

  if (isLoading) {
    const loadingHTML = `<li>
        <span class='name'>Loading</span>
      </li>
      `;
    return (suggestions.innerHTML = loadingHTML);
  }

  if (input.length === 0) {
    proTip.style.visibility = "hidden";
    const loadingHTML = `<li>
        <span class='name'>Mind searching for something?</span>
      </li>
      `;
    return (suggestions.innerHTML = loadingHTML);
  }

  const countries = matchCountry(input, allCountries);

  const countriesHTML = countries
    .map((country) => {
      const regex = new RegExp(input, "gi");

      const countryName = country.name.replace(
        regex,
        `<span class='hl'>${this.value}</span>`
      );
      const capitalName = country.capital.replace(
        regex,
        `<span class='hl'>${this.value}</span>`
      );

      return `
      <li>
        <span class='name'><a class="clink" href="https://en.wikipedia.org/wiki/${
          country.name
        }" target="_blank" rel="noopener noreferrer">${countryName}</a>, ${capitalName} </span>
        <span class='population'>${numberWithCommas(country.population)}</span>
        <img class='flag' src=${country.flag}>
      </li>
      `;
    })
    .join("");

  suggestions.innerHTML = countriesHTML;
}

getCountries();
searchInput.addEventListener("input", displayMatched);
