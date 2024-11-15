import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { lightTheme, darkTheme, GlobalStyle } from './styles';
import CurrentWeather from './components/CurrentWeather';
import WeatherForecast from './components/WeatherForecast';
import InputBar from './components/InputBar';
import icons from './assets/icons';

const App = () => {
  const [theme, setTheme] = useState("light");
  const [data, setData] = useState(null);
  const [currentWeather, setCurrentWeather] = useState()
  const [city, setCity] = useState('Utrecht');
  const [location, setLocation] = useState({
    lat: "52.080985600000005",
    lon: "5.12768396945229",
    city: "Utrecht",
    country: "NL"
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

  // Coördinaten en locatieinfo ophalen op basis van stad
  useEffect(() => {
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${process.env.REACT_APP_API_KEY}`)
      .then(res => res.json())
      .then(locationdata => {
        if (locationdata[0].local_names) {
          return setLocation({
            lat: locationdata[0].lat,
            lon: locationdata[0].lon,
            city: locationdata[0].name,
            nlcity: locationdata[0].local_names.nl,
            country: locationdata[0].country
          })
        } else {
          return setLocation({
            lat: locationdata[0].lat,
            lon: locationdata[0].lon,
            city: locationdata[0].name,
            country: locationdata[0].country
          })
        }
      });
  }, [city])

  // Weerdata ophalen met coördinaten uit de andere API
  useEffect(() => {
    fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/250575?apikey=${process.env.REACT_APP_API_KEYACCU}&language=nl-nl&details=true&metric=true`)

      .then(res => {
        if (res.ok) {
        return res.json();
        }
        throw new Error();
  })
      .then(weatherdata => {
        setData(weatherdata.DailyForecasts)
        console.log(weatherdata.DailyForecasts)
      })
      .catch((error) => {
        console.log(error)
      });
  }, [location])

  useEffect(() => {
    fetch(`http://dataservice.accuweather.com/currentconditions/v1/250575?apikey=${process.env.REACT_APP_API_KEYACCU}&language=nl-nl&details=true`)
    .then(res => {
      if (res.ok) {
      return res.json();
      }
      throw new Error();
    })
    .then(data => {
      setCurrentWeather(data[0])
      console.log(data)
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
          <InputBar setCity={setCity} />
        </InputWrapper>
        {data ? (
          <>
            <WeatherWrapper><CurrentWeather data={currentWeather} location={location} /></WeatherWrapper>
            <ForecastWrapper><WeatherForecast data={data} /></ForecastWrapper>
          </>
        )
          :
          <>
            <ErrorWrapper>
              <img alt="sad-cloud" src="icons/error.svg"></img>
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

.suggestions-container {
  font-size: 0.85rem;
  color: white;
  position: relative;
}

.searchbar-suggestions {
  width: 10.4rem;
  position: absolute;
  margin: 0 auto;
  left: -5.4rem;
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
  width: 48rem;
  max-width: 100%;
  height: 15rem;
  max-height: 100%;
  background-color: rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  border: 0 1px solid white;
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
  padding: 1rem;
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

export default App;