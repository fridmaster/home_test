

function getForecast(city) {
  city = city.replace(/ /g,'');
  return fetch(`http://localhost:3000/weather?city=${city}`).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      throw Error();
    }
  });
}

 function getFilm(){
  return fetch('http://localhost:3000/film').then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      throw Error();
    }
  });
}

export { getForecast, getFilm};