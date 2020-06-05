class WeatherStorage {
    constructor(){
     if(! WeatherStorage.instance){
       this._data = {};
       WeatherStorage.instance = this;
     }
  
     return WeatherStorage.instance;
    }
  
    add(city:string, weathre){
        this._data[city]= weathre;
    }
    
    get(city){
        return this._data[city] ? this._data[city] : null;
    }  
  }
  
  const instance = new WeatherStorage();
  Object.freeze(instance);
  
  export default instance;