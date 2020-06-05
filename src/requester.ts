import request from 'request';
const films = [
    'tt1133985',
    'tt3896198',
    'tt6905686',
    'tt9308382',
    'tt1517451',
    'tt7713068',
    'tt7713068',
    'tt4154756',
    'tt1727824'
];
const filmKey = 'dce24c91';
const weatherKey = 'c2152ce33eec94f628bcb40cda3da446';

export default class Requester {

    constructor() { }

    public async getWeather(city) {
        return new Promise((resolve, reject) =>
            request.get(`http://api.openweathermap.org/data/2.5/forecast?q=Tel Aviv&units=metric&appid=${weatherKey}`, (error, response, body) => {
                if (!error && response.statusCode == 200) {
                    let json = JSON.parse(body);
                    let days = json.list.filter((day) => day.dt_txt.includes("12:00:00"))
                    resolve(days);
                } else {
                    reject(error);
                }
            })
        )
    }

    public async getFilms() {
        const filmId = this.randomFilmImbd();
        return new Promise((resolve, reject) =>
            request.get(`http://www.omdbapi.com/?i=${filmId}&apikey=${filmKey}`, (error, response, body) => {
                if (!error && response.statusCode == 200) {
                    let json = JSON.parse(body);
                    let fimInfo = {  
                        title:json.Title,
                        year:json.Year,
                        plot:json.Plot
                    };
                    resolve(fimInfo);
                } else {
                    reject(error);
                }
            })
        )
    }

    private randomFilmImbd(){
        return films[Math.floor(Math.random() * Math.floor(films.length-1))];
    }
}