import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { lightTheme, darkTheme, GlobalStyle } from './styles';
import CurrentWeather from './components/CurrentWeather';
import WeatherForecast from './components/WeatherForecast';
import InputBar from './components/InputBar';
import icons from './assets/icons';

const App = () => {
  const [theme, setTheme] = useState("light");
  const [weather, setWeather] = useState(null);
  const [currentWeather, setCurrentWeather] = useState()
  const [city, setCity] = useState('Amsterdam');
  const [seeWeatherDetails, setSeeWeatherDetails] = useState(false)
  const [loading, setLoading] = useState(true)
  const [location, setLocation] = useState({
    "Key":"249758",
    "LocalizedName":"Amsterdam",
    "Country":{
       "LocalizedName":"Nederland"
    }
 });

  const themeToggler = () => {
    let toggle = document.querySelector(".theme-toggle")
    if (theme === "light") {
      toggle.src = icons.sun
      setTheme("dark")
    } else {
      toggle.src = icons.moon
      setTheme("light")
    }
  };

  // Weerdata ophalen met coördinaten uit de andere API
  useEffect(() => {
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.lon}&current=weather_code,temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,surface_pressure,wind_direction_10m,wind_gusts_10m&hourly=temperature_2m,rain&forecast_days=1`)
      .then(res => {
        if (res.ok) {
        return res.json();
        }
        throw new Error();
  })
      .then(weatherdata => {
        setCurrentWeather(weatherdata)
      })
      .catch((error) => {
        console.log(error)
        setLoading(false)
      });
  }, [location])


  useEffect(() => {
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.lon}&daily=weather_code,temperature_2m_max,apparent_temperature_max,temperature_2m_min,apparent_temperature_min,sunrise,sunset,daylight_duration,sunshine_duration,uv_index_max,wind_speed_10m_max,precipitation_probability_max,precipitation_sum`)
    .then(res => {
      if (res.ok) {
      return res.json();
      }
      throw new Error();
    })
    .then(data => {
      setWeather(data)
      console.log(data)
      setLoading(false)
    })
    .catch((error) => {
      console.log(error)
    });
}, [location])

  // Het klikken van de enter key gelijk zetten aan klikken zoekbutton
  useEffect(() => {
    document.querySelector(".input").addEventListener("keyup", function (event) {
      event.preventDefault();
      if (event.key === 'Enter') {
        document.querySelector(".button").click();
      }
    });
  }, [city])

  return (
    <>
      <GlobalStyle theme={theme === "light" ? lightTheme : darkTheme} />
      <Wrapper>
      <img className="theme-toggle" onClick={() => themeToggler()} src={icons.moon}></img>
        <InputWrapper>
          <InputBar setCity={setCity} location={location} setLocation={setLocation} />
        </InputWrapper>
        {weather ? (
          <>
            <WeatherWrapper><CurrentWeather data={currentWeather} location={location} seeWeatherDetails={seeWeatherDetails} setSeeWeatherDetails={setSeeWeatherDetails} /></WeatherWrapper>
            <ForecastWrapper><WeatherForecast data={weather.daily} current={currentWeather} seeWeatherDetails={seeWeatherDetails} setSeeWeatherDetails={setSeeWeatherDetails} /></ForecastWrapper>
          </>
        ) : loading ? <Loader /> :
          <>
            <ErrorWrapper>
              <h2>Oeps, er ging iets mis</h2><p>Kom later terug om het<br></br>opnieuw te proberen</p>
            </ErrorWrapper>
          </>
        }
      </Wrapper>
    </>
  );
}

// Styled components
const Wrapper = styled.div`
margin: 0 auto;
max-width: 100%;
overflow: hidden;

@media screen and (max-width: 680px) {
  width: 100%;
  max-width: 100%;
  }

  .theme-toggle {
    width: 1rem;
    position: absolute;
    top: 0.2rem;
    left: 0.2rem;
    cursor: pointer;
  }
`

const InputWrapper = styled.div`
margin: 1rem auto;
width: 16rem;
max-width: 100%;

.button {
  width: 4rem;
  border-radius: 1rem;
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  border-color: white;
  margin-left: 0.2rem;
  align-self: center;
}

.button:hover {
  cursor: pointer;
}

.input {
width: 200px;
box-sizing: border-box;
border: 1px solid white;
padding: 5px;
border-radius: 5px;
}

.suggestions-container {
  font-size: 0.85rem;
  color: white;
  position: relative;
    width: 200px;
}

.searchbar-suggestions {
  box-sizing: border-box;
  width: 100%;
  position: absolute;
  margin: 0 auto;
  right: 0;
  z-index: 3;
  border: 1px solid white;
  cursor: pointer;

  .suggests {
    margin-top: -0.5rem;
    margin-bottom: -0.5rem;
    margin-left: .2rem;
  }
}

@media screen and (max-width: 680px) {
  max-width: 100%;
  display: flex;
  flex-direction: column;

  .button {
    margin-top: .5rem;
  }
    }
`

const WeatherWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 48rem;
  max-width: 100%;
  height: 15rem;
  max-height: 100%;
  background-color: rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  padding: 1.3rem;
  border-radius: 1.5rem 1.5rem 0 0;
  max-width: 100%;
  margin: 0 auto;
  position: relative;

  @media screen and (max-width: 680px) {
  height: 23rem;
  width: 100%;
  max-width: 100%;
  margin-left: -1rem;
  border-radius: 0;
  }
`;

const ForecastWrapper = styled.div`
  display: flex;
  width: 48rem;
  height: 11rem;
  background-color: rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  padding: 1.3rem;
  border-top: 1px solid white;
  border-radius: 0 0 1.5rem 1.5rem;
  max-width: 100%;
  margin: 0 auto;

@media screen and (max-width: 680px) {
  height: 30rem;
  width: 100%;
  max-width: 100%;
  border-radius: 0;
  margin-left: -1rem;
    }
`;

const ErrorWrapper = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  width: 20rem;
  height: 30rem;
  margin: auto;
  text-align: center;
  border-radius: 1rem;
  font-size: 1.1rem;

  h2 {
    margin-top: -2rem;
  }

  img {
    width: 20rem;
  }
`

const Loader = styled.div`
margin: 40vh auto;
  width: 65px;
  aspect-ratio: 1;
  --g: radial-gradient(farthest-side,#0000 calc(95% - 3px),#fff calc(100% - 3px) 98%,#0000 101%) no-repeat;
  background: var(--g), var(--g), var(--g);
  background-size: 30px 30px;
  animation: l10 1.5s infinite;

@keyframes l10 {
  0% {
    background-position: 0 0, 0 100%, 100% 100%;
  }
  25% {
    background-position: 100% 0, 0 100%, 100% 100%;
  }
  50% {
    background-position: 100% 0, 0 0, 100% 100%;
  }
  75% {
    background-position: 100% 0, 0 0, 0 100%;
  }
  100% {
    background-position: 100% 100%, 0 0, 0 100%;
  }
}
`

export default App;