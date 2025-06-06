// 5d8509c4cc6b9e81e649ee770bd9dbaf (API - KEY)
// https://api.openweathermap.org/data/2.5/weather?q=London&appid=5d8509c4cc6b9e81e649ee770bd9dbaf&units=metric
import "./style.css";

const apiKey = "5d8509c4cc6b9e81e649ee770bd9dbaf";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";

const searchInput = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

async function checkWeather(city) {
  try {
    const response = await fetch(`${apiUrl}&q=${city}&appid=${apiKey}`);
    let data = await response.json();
    document.querySelector(".city").innerHTML =
      data.name !== undefined ? data.name : "Not a City";
    document.querySelector(".temp").innerHTML =
      data.name !== undefined ? data.main.temp.toFixed(0) + "°C" : "-";
    document.querySelector(".humidity").innerHTML =
      data.name !== undefined ? data.main.humidity + "%" : "-";
    document.querySelector(".wind").innerHTML =
      data.name !== undefined ? data.wind.speed + "km/h" : "-";
    const imgweather = document.querySelector(".weather-icon");
    imgweather.src = `./img/${data.weather[0].main.toLowerCase()}.svg`;
    console.log(data.weather[0].main.toLowerCase());
    console.log(data);

    changeTempColor(data.main.temp);
  } catch (e) {
    console.error("Erro:", e.message);
  }
}

// Adiciona evento para tecla pressionada
document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    searchBtn.click(); // Simula o clique no botão
  }
});

searchBtn.addEventListener("click", () => {
  checkWeather(searchInput.value);
});

function changeTempColor(temp) {
  const tempClasses = [
    { min: 35, class: "extremehot" },
    { min: 25, class: "hot" },
    { min: 15, class: "normal" },
    { min: 5, class: "cold" },
    { min: -Infinity, class: "extremecold" },
  ];

  const card = document.querySelector(".card");
  card.classList.remove("extreme-hot", "hot", "normal", "cold", "extreme-cold");

  // Busca a primeira faixa compatível com a temperatura
  const matchedClass = tempClasses.find((range) => temp >= range.min)?.class;

  // Adiciona a classe correspondente
  if (matchedClass) {
    card.classList.add(matchedClass);
  }
}
