import {getForecast, getFilm} from './httpService';

const loaderEl = document.getElementById("loader");

document.getElementById("townsInput").addEventListener("change", (e) => {
  const city = e.target.value;
  showLoader();
  cleanPrivios();
  getForecast(city)
    .then(createForecastCardList)
    .then(hideLoader);
});

function cleanPrivios(){
  const weatherSelection = document.querySelector("#weatherCardsContainer");
  const filmSection = document.querySelector("#filmSuggestionContainer");
  filmSection.innerHTML = '';
  weatherSelection.innerHTML = '';
}

function createForecastCardList(dayList) {
  console.log(dayList)
  const section = document.querySelector("#weatherCardsContainer");
  const template = document.querySelector("#weatherCardTemplate");
  for (const day of dayList) { 
    const clone = template.content.cloneNode(true);
    const dayText = clone.querySelector('[data-card="dayText"]');
    dayText.innerHTML = day.dt_txt;
    const dayTemp = clone.querySelector('[data-card="dayTemp"]');
    dayTemp.innerHTML = String(Math.floor(day.main.temp));
    const footer = clone.querySelector('[data-card="footer"]');
    const btn = document.createElement("button");
    btn.className =
      "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded";
    btn.innerHTML = "suggest movie";
    btn.addEventListener('click', (e)=>{
      getFilm().then(showFilm)
    })
    if (Math.floor(day.main.temp) > 25) {
      footer.innerHTML = '';
      footer.appendChild(btn);
    }
    section.appendChild(clone);
  }
}



function showFilm(filmData){
  const section = document.querySelector("#filmSuggestionContainer");
  const filmContainer = document.querySelector("#filmSuggestionCard");
  const clone = filmContainer.content.cloneNode(true);
  const filmTitle = clone.querySelector('[data-card="filmTitle"]');
  filmTitle.innerHTML = filmData.title;
  const filmYear = clone.querySelector('[data-card="filmYear"]');
  filmYear.innerHTML = filmData.year;
  const filmPlot = clone.querySelector('[data-card="filmPlot"]');
  filmPlot.innerHTML = filmData.plot;
  section.appendChild(clone);
}

function hideLoader() {
  loaderEl.style.display = "none";
}
function showLoader() {
  loaderEl.style.display = "flex";
}
