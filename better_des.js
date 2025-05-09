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
        const div = document.createElement("div");
        div.classList.add("countryCard");

        const countryName = country.name.common;
        const capital = country.capital ? country.capital[0] : "N/A";

        div.innerHTML = `
            <h2>${countryName}</h2>
            <p><strong>Region:</strong> ${country.region}</p>
            <p><strong>Capital:</strong> ${capital}</p>
            <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
            <img src="${country.flags.png}" alt="Flag of ${countryName}">
        `;

        display.appendChild(div);
    });
}
