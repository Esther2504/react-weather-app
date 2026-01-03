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
  const [city, setCity] = useState('Amsterdam');
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
    console.log(location)
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m`)
      .then(res => {
        if (res.ok) {
        return res.json();
        }
        throw new Error();
  })
      .then(weatherdata => {
        console.log(weatherdata)
        setData(weatherdata)
      })
      .catch((error) => {
        console.log(error)
      });
  }, [location])


//   useEffect(() => {
//     fetch(`https://dataservice.accuweather.com/currentconditions/v1/${location.Key}?apikey=${process.env.REACT_APP_API_KEYACCU}&language=nl-nl&details=true`)
//     .then(res => {
//       if (res.ok) {
//       return res.json();
//       }
//       throw new Error();
//     })
//     .then(data => {
//       setCurrentWeather(data[0])
//     })
//     .catch((error) => {
//       console.log(error)
//     });
// }, [location])

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
        {data ? (
          <>
            <WeatherWrapper><CurrentWeather data={data} location={location} /></WeatherWrapper>
            {/* <ForecastWrapper><WeatherForecast data={data} /></ForecastWrapper> */}
          </>
        )
          :
          <>
            <ErrorWrapper>
              <img alt="sad-cloud" src="icons/sad-cloud.svg"></img>
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