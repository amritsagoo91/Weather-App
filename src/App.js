import react, { useEffect, useState } from 'react'


function App() {
  const [city, setCity] = useState('Phillaur');
  const [weatherData, setWetherData] = useState(null);
  const currentDate = new Date();
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = months[currentDate.getMonth()];
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();
  const formattedDate = `${month} ${day},${year}`;

  const API_KEY = "6d38db546c2c0ce48abf19e2e9854f7d";

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`)
      const data = await response.json();
      //console.log(data);
      setWetherData(data);

    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchWeatherData();
  }

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const getWeatherIconUrl = (main) => {

    switch (main) {
      case "Clear":
        return "/sun.png"
      case "Clouds":
        return "/thuder.png";
      case "Rain":
        return "/rain_with_cloud.png"
      case "Mist":
        return "/Tornado.png"
      case "Haze":
        return "/sun.png"
      default:
        return "Null"
    }
  }



  return (
    <div className='App'>
      {
        weatherData && (
          < div className="container" >
            <h1 className="container_date">{formattedDate}</h1>
            <div className="weather_data">
              <h2 className="container_city">
                {weatherData.name}
              </h2>
              <img src={getWeatherIconUrl(weatherData.weather[0].main)} alt="thunder" className="container_img" width="180px" />
              <h2 className="container_degree">{((weatherData.main.temp) - 273.15).toFixed(2)}</h2>
              <h2 className="container_per">{weatherData.weather[0].main}</h2>
              <form className='form' onSubmit={handleSubmit}>
                <input type="text" className='input' placeholder='Enter City' onChange={e => setCity(e.target.value)} />
                <button className='btn btn-primary py-3' type='submit'>Get</button>
              </form>
            </div>
          </div >
        )
      }
      {/* <Demo /> */}
    </div>

  );
}

export default App;