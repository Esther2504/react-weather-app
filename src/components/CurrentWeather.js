import React from 'react'
import styled from 'styled-components';

export default function CurrentWeather({ location, data }) {
  let currentDate = (new Date(data?.LocalObservationDateTime)).toLocaleDateString('nl-NL', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' });

  return (
    <>
      <CityDate>   
        <p className="city">{location?.LocalizedName}, {location?.Country?.LocalizedName}</p>
        <p className='date'>{currentDate}</p>
      </CityDate>
      <Weather>
        <img alt={data?.WeatherText} src={`http://localhost:3000/react-weather-app/icons/${data?.WeatherIcon}.svg`}></img>
        <h1>{data?.Temperature?.Metric?.Value}°C</h1>
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