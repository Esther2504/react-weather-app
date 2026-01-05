import React from 'react'
import styled from 'styled-components'
import icons from '../assets/icons';

export default function WeatherForecast({ data }) {

  const forecastDates = (data.time).slice(1, 6)

  console.log(data)

  return (
    <Wrapper>
      {forecastDates.map((day, key) => {
        return (
      <div className="flip-card">
      <div className="flip-card-inner">
        <div className='flip-card-front'>
          <p>{(new Date((day)).toLocaleDateString('nl-NL', { weekday: 'long'}))}</p>
          <img alt={data.weather_code[key]} src={`/react-weather-app/icons/${data.weather_code[key]}.svg`}></img>
          <p>{data.temperature_2m_max[key]}°C</p>
        </div>
        <div className="flip-card-back">
          <div className="weather-info">
            <div>
            <img alt="regenval" src={icons.rainsum}></img>
            <p>{data.precipitation_sum[key]} mm</p>
            </div>
            <div>
            <img alt="regenkans" src={icons.rainchance}></img>
            <p>{data.precipitation_probability_max[key]}%</p>
            </div>
            <div>
            <img alt={data.wind_speed_10m_max[key]} src={icons.wind}></img>
            <p>{data.wind_speed_10m_max[key]} km/h</p>
            </div>
            <div>
            <img alt="uv-index" src={icons.uvindex}></img>
            <p>{data.uv_index_max[key]}</p>
            </div>
          </div> 
        </div>
      </div>
    </div>
        )
      })}
    </Wrapper>
  )
}

// Styled components
const Wrapper = styled.div`
display: flex;
margin-left: 0.5rem;

.flip-card {
  height: 9.5rem;
  width: 7.5rem;
  margin: 0 0.9rem;

  img {
    width: 3.5rem;
  }
}

.flip-card-inner {
  position: relative;
  height: 100%;
  transition: transform 1s;
  transform-style: preserve-3d;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.1);
  text-align: center;
  border-radius: .5rem;
  display: flex;
  margin: 0.5rem;
  justify-content: space-evenly;
  align-items: center;
  margin-left: 0rem;

  p::first-letter {
    text-transform: capitalize;
  }
}

.flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
}

.flip-card-front, .flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  transform: rotateX(0deg);
}

.flip-card-front {
  display: flex;
  flex-direction: column;
  margin: 1rem;
  justify-content: space-evenly;
  align-items: center;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
}

.flip-card-back {
  transform: rotateY(180deg);
  border-radius: .5rem;
  width: 100%;
  height: 100%;
  display: flex;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);

  img {
    width: 1.8rem;
  }

  p {
    font-size: 0.8rem;
    margin: 0;
  }

  .weather-info {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    align-items: center;
    padding: 5px;
  }
}

@media screen and (max-width: 680px) {
  display: grid;
  grid-template-areas: 
  ". . . ."
  ". . . ."
  ". . . ."; 
  margin: 0 auto;
  margin-left: 0;

  .flip-card-front, .flip-card-back, .flip-card-inner, .flip-card {
    max-width: 100%;
  }
    }

@media screen and (max-width: 590px) {
    display: grid;
    grid-template-areas: 
    ". ."
    ". ."
    ". ."; 
    align-items: center;
    max-width: 100%;
    margin: 0 auto;
      
    .flip-card-front, .flip-card-back, .flip-card-inner, .flip-card {
       max-width: 100%;
     }
 }
`