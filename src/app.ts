import express from 'express';
import Requester from './requester';
import WeatherStorage from './storage'
import path from 'path';
import cors from 'cors';
const app = express();
const port = 3000


app.get('/weather', cors(), async (req, res) => {
    let city = req.query.city;
    if(!city) await res.send({error:'no city'})
    console.log(WeatherStorage.get(city))
    if(WeatherStorage.get(city)){
        await res.send(WeatherStorage.get(city));
    }
    let weather = await new Requester(req, res).getWeather(city);
    WeatherStorage.add(city, weather);
    res.send(weather);
})

app.get('/film', cors(), async (req, res) => {
    let film = await new Requester(req, res).getFilms();
    res.send(JSON.stringify(film))
})

app.get('/', cors(),async(req, res)=>{
    res.sendFile(path.join(__dirname + '/../client/dist/index.html'));
})

app.get('/*.js || /*.css || /*.map', cors(), (req, res)=>{
    res.sendFile(path.join(__dirname + '/../client/dist'+ req.url));
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))