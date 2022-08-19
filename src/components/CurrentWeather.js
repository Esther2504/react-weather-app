import React from 'react'
import styled from 'styled-components';

export default function CurrentWeather({ location, data }) {
  // De huidige datum van de gezochte stad weergeven
  let currentDate = (new Date(((data.current.dt - 7200) + data.timezone_offset) * 1000)).toLocaleDateString('nl-NL', { year: 'numeric', month: 'long', day: 'numeric' });
  let currentDay = (new Date(((data.current.dt - 7200) + data.timezone_offset) * 1000)).toLocaleDateString('nl-NL', { weekday: 'long' })

  // Als de Nederlandse naam van de stad undefined is, wordt de Engelse naam gebruikt
  let city = location.nlcity
  if (location.nlcity === undefined) {
    city = location.city
  }

  return (
    <>
      <CityDate>   
        <p className="city">{city}, {location.country}</p>
        <p className='date'>{currentDay + ", " + currentDate}</p>
      </CityDate>
      <Weather>
        <img alt={data.current.weather[0].description} src={`icons/${data.current.weather[0].icon}.svg`}></img>
        <h1>{Math.round((data.current.temp - 273.15) * 10) / 10}°C</h1>
      </Weather>
    </>
  )
}

// Styled components
const CityDate = styled.div`
.city {
    font-size: 2.5rem;
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