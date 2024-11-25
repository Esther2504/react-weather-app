import React from 'react'
import styled from 'styled-components'
import icons from '../assets/icons';

export default function WeatherForecast({ data }) {
  return (
    <Wrapper>
      {data.map((day) => {
        return (
      <div className="flip-card">
      <div className="flip-card-inner">
        <div className='flip-card-front'>
          <p>{(new Date((day.Date)).toLocaleDateString('nl-NL', { weekday: 'long'}))}</p>
          <img alt={day.Day?.LongPhrase} src={`/react-weather-app/icons/${day.Day?.Icon}.svg`}></img>
          <p>{day.Temperature?.Maximum?.Value}°C</p>
        </div>
        <div className="flip-card-back">
          <div className="weather-info">
            <img alt="bewolktheid" src={icons.cloudiness}></img>
            <p>{day.Day?.CloudCover}%</p>
            <img alt={day.Day?.Wind?.Direction?.Localized} src={icons.winddirection} style={{transform: `rotate(${day.Day?.Wind?.Direction?.Degrees}deg)`}}></img>
            <p>{day.Day?.Wind?.Speed?.Value} km/h</p>
          </div>
          <div className="weather-info">
            <img alt="regenkans" src={icons.rainchance}></img>
            <p>{day.Day?.RainProbability}%</p>
            <img alt="uv-index" src={icons.uvindex}></img>
            <p>{day.AirAndPollen[5]?.Value}<br></br>/12</p>
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
    margin-top: 0;
  }

  .weather-info {
    margin: 0.8rem; 
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