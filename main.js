//4d71e2ca78b19770ec229c75b21db70c
// api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={your api key}

let rgb_base = [
  "(90deg, rgba(21,204,82,1) 0%, rgba(13,200,240,1) 100%)",
  "(160deg, rgba(255,0,0,1) 0%, rgba(181,204,21,1) 100%)",
  "(160deg, rgba(0,52,255,1) 0%, rgba(39,252,0,1) 100%)",
  "(220deg, rgba(0,255,42,1) 0%, rgba(252,0,246,1) 100%)",
  "(0deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)",
  "(236deg, rgba(255,244,0,1) 0%, rgba(45,210,253,1) 100%)",
  "(236deg, rgba(228,255,0,1) 17%, rgba(94,253,45,1) 86%)",
  "(56deg, rgba(255,98,0,1) 0%, rgba(213,253,45,1) 100%)"
];

let data = {
  wiki_city : 0, 

  lat : 0,
  lng : 0,
  wtr_data : 0,
  temp_feel : 0,
  vlaga_data : 0,
  wind_speed : 0,
  wind_deg : 0,
  clouds_data : 0,

  add_wallpaper() {  
    function getRndm(min, max) {
      let num_wallp = Math.floor(Math.random() * (max - min + 1) ) + min;
      document.body.style.background = `linear-gradient${rgb_base[num_wallp]}`;
    }
    getRndm(0, 6);
  }, 

  srch_country() {
    //a6ef7ec1f6c949ab82e7f582bac77c48
    let cntr_url = `https://api.opencagedata.com/geocode/v1/json?q=${this.lat}+${this.lng}&key=a6ef7ec1f6c949ab82e7f582bac77c48`;
    let cntr = new XMLHttpRequest();
    cntr.open("GET", cntr_url);
    cntr.responseType = "json";
    cntr.send();

    cntr.onload = () => {
      let country_info = cntr.response;

      let country = country_info.results[0].components.country;
      let city = country_info.results[0].components.city;
      data.wiki_city = country_info.results[0].components.city;

      document.getElementById('check-wiki').innerHTML = `Прочитать про ${data.wiki_city} в Wikipedia`;
      document.getElementById("city-country-name").innerHTML = city + ", " + country;
    }

    data.weather_result();
  },
  weather_result() {
    document.getElementById('weather-icon').setAttribute('src', 'http://openweathermap.org/img/wn/' + data.wtr_data.weather[0].icon + '@2x.png');
    document.getElementById('temp-data').innerHTML = this.wtr_data.main.temp + "&deg;";
    document.getElementById('temp-feel-data').innerHTML = this.temp_feel + "&deg;";
    document.getElementById('vlaga-data').innerHTML = this.vlaga_data + "%";
    document.getElementById('wind-speed').innerHTML = this.wind_speed + " метр/сек";
    document.getElementById('wind-deoganal').innerHTML = this.wind_deg + " град";
    document.getElementById('clouds-data').innerHTML = this.clouds_data + "%";
    document.getElementById('coord-lat-lon').innerHTML = `Широта: ${data.lat} | Долгота: ${data.lng}`;
  }
};

let btn_search = document.getElementById('button-search');
btn_search.addEventListener('click', (e) => {
  let city_name = document.getElementById('search-city-input').value;
  
  //4d71e2ca78b19770ec229c75b21db70c
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&units=metric&appid=4d71e2ca78b19770ec229c75b21db70c`;
  let xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.responseType = "json";
  xhr.send();

  xhr.onload = () => {
    if (xhr.status == 404) alert("Ошибка соединения или неправильное имя Города");
    data.wtr_data = xhr.response;

    data.add_wallpaper();
    data.lat = data.wtr_data.coord.lat;
    data.lng = data.wtr_data.coord.lon;
    data.temp_feel = data.wtr_data.main.feels_like;
    data.vlaga_data = data.wtr_data.main.humidity;
    data.wind_speed = data.wtr_data.wind.speed;
    data.wind_deg = data.wtr_data.wind.deg;
    data.clouds_data = data.wtr_data.clouds.all;

    data.srch_country();
  };
  xhr.onerror = () => { 
    alert(`Ошибка соединения`);
  };
});

let btn_wiki_check = document.getElementById('check-wiki');
btn_wiki_check.addEventListener('click', function(e) {
  document.getElementById("form-check-wiki-btn").removeAttribute("action");
  document.getElementById("form-check-wiki-btn").setAttribute("action", `https://ru.wikipedia.org/wiki/${data.wiki_city}`);
});


