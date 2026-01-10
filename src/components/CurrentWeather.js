import React from 'react'
import styled from 'styled-components';

export default function CurrentWeather({ location, data, seeWeatherDetails, setSeeWeatherDetails }) {
  let currentDate = (new Date(data?.current.time)).toLocaleDateString('nl-NL', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' });

  console.log(data)

  console.log(seeWeatherDetails)

  return (
    <>
    {seeWeatherDetails ? 
    <>
    <div onClick={() => setSeeWeatherDetails(false)}>Arrow</div>
      <CityDate>   
        <p className="city">{location?.display_name}</p>
        <p className='date'>{currentDate}</p>
      </CityDate>
      <Weather>
        <img alt={data?.current.weather_code} src={`/react-weather-app/icons/${data?.current.weather_code}.svg`}></img>
        <h1>{data?.current.temperature_2m}°C</h1>
        <p>Bewolking: {data.current.cloud_cover} %</p>
        <p>Gevoelstemperatuur: {data.current.apparent_temperature}</p>
        <p>Gevoelstemperatuur: {data.relative_humidity_2m}</p>
        <p>Gevoelstemperatuur: {data.rain}</p>
        <p>Gevoelstemperatuur: {data.wind_speed_10m}</p>
      </Weather>
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