function start() {
    const searchTerm = document.getElementById("searchBox").value;
    const url = `https://restcountries.com/v3.1/name/${searchTerm}`;

    fetch(url)
        .then(res => res.json())
        .then(data => process(data))
        .catch(err => alert("Country not found!"));
}



function process(data) {
    const display = document.getElementById("displayArea");
    display.textContent = "";

    data.forEach(country => {
        const countryName = country.name.common;
        const capital = country.capital ? country.capital[0] : "N/A";
        const population = country.population.toLocaleString();
        const region = country.region;
        const flag = country.flags.png;

        const currencyCode = Object.keys(country.currencies)[0];
        const currency = country.currencies[currencyCode];
        const currencyDisplay = `${currency.name} (${currency.symbol})`;
        const languageList = Object.values(country.languages || {}).join(", ");
        const area = `${country.area.toLocaleString()} km²`;
        const demonym = country.demonyms?.eng?.m || "N/A";

        const div = document.createElement("div");
        div.classList.add("countryCard");

        div.innerHTML = `
            <h2>${countryName}</h2>
            <img src="${flag}" alt="Flag of ${countryName}">
            <p><strong>Capital:</strong> ${capital}</p>
            <p><strong>Region:</strong> ${region}</p>
            <p><strong>Population:</strong> ${population}</p>
            <p><strong>Currency:</strong> ${currencyDisplay}</p>
            <p><strong>Languages:</strong> ${languageList}</p>
            <p><strong>Area:</strong> ${area}</p>
            <p><strong>Demonym:</strong> ${demonym}</p>
        `;

        display.appendChild(div);
    });
}