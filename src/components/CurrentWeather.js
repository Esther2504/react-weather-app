import React from 'react'
import styled from 'styled-components';
import icons from '../assets/icons';

export default function CurrentWeather({ location, data, seeWeatherDetails, setSeeWeatherDetails }) {
  let currentDate = (new Date(data?.current.time)).toLocaleDateString('nl-NL', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' });

  console.log(data)

  console.log(seeWeatherDetails)

  return (
    <>
      {seeWeatherDetails ?
        <>
          {/* <div onClick={() => setSeeWeatherDetails(false)}>Arrow</div> */}
          <CityTemp>
            <CityDate>
              <p className="city">{location?.display_name}</p>
              <p className='date'>{currentDate}</p>
            </CityDate>
            <Temp>
              <img alt={data?.current.weather_code} src={`/react-weather-app/icons/${data?.current.weather_code}.svg`}></img>
              <h1>{data?.current.temperature_2m}°C</h1>
              <p>Gevoelstemperatuur: {data.current.apparent_temperature}°C</p>
            </Temp>
          </CityTemp>
          <WeatherDetails>
            <div><img alt={data?.current.weather_code} src={icons.cloudiness} /> Bewolktheid <br />{data.current.cloud_cover}%</div>
            <div><img alt={data?.current.weather_code} src={icons.humidity} /> Luchtvochtigheid<br />{data.current.relative_humidity_2m}%</div>
            <div><img alt={data?.current.weather_code} src={icons.rainchance} /> Neerslag<br />{data.current.precipitation} mm</div>
            <div><img alt={data?.current.weather_code} src={icons.wind} /> Wind<br />{data.current.wind_speed_10m} km p/u</div>
            <div><img alt={data?.current.weather_code} src={icons.airpressure} /> Luchtdruk<br />{data.current.surface_pressure} hPa</div>
          </WeatherDetails>
        </>
        :
        <>
          <CityDate>
            <p className="city">{location?.display_name}</p>
            <p className='date'>{currentDate}</p>
          </CityDate>
          <Weather>
            <div onClick={() => setSeeWeatherDetails(true)}>Arrow</div>
            <img alt={data?.current.weather_code} src={`/react-weather-app/icons/${data?.current.weather_code}.svg`}></img>
            <h1>{data?.current.temperature_2m}°C</h1>
          </Weather>
        </>
      }
    </>
  )
}

// Styled components
const CityDate = styled.div`
.city {
    font-size: 2.2rem;
    margin-top: 5px;
}

.date {
    margin-top: -1.5rem;
    ::first-letter {
      text-transform: capitalize;
    }
}

@media screen and (max-width: 680px) {
    text-align: center;
    width: 100%;
}
`

const Weather = styled.div`
display: flex;
flex-direction: column;
position: absolute;
right: 3.5rem;
top: 2rem;
text-align: center;

img {
 width: 10rem;   
}

h1 {
    font-size: 3rem;
    margin-top: 0;
    margin-left: 0rem;
}

@media screen and (max-width: 680px) {
  right: 0;
  top: 8rem;
  text-align: center;
  width: 100%;

  img {
    margin: 1rem auto 0;
  }
}
`

const WeatherDetails = styled.div`
width: 100%;
display: flex;
gap: 20px;
justify-content: space-between;

div {
display: flex;
gap: 10px;
align-items: center;

img {
width: 30px;
}
}
`

const CityTemp = styled.div`
width: 100%;
display: flex;
justify-content: space-between;

img {
width: 150px
}
`
const Temp = styled.div`
    width: 280px;
    text-align: center;
        display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    flex-wrap: wrap;

    h1 {
    margin: 0;
    }

    p {
           margin: -16px 0 16px 0;
        }
    `