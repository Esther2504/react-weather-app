import React from 'react'
import styled from 'styled-components'
import icons from '../assets/icons';

export default function WeatherForecast({ data }) {
  return (
    <Wrapper>
      <div className="flip-card">
        <div className="flip-card-inner">
          <div className='flip-card-front'>
            <p>{(new Date((data.daily[0].dt + data.timezone_offset) * 1000)).toLocaleDateString('nl-NL', { weekday: 'long'})}</p>
            <img alt={data.daily[0].weather[0].description} src={`icons/${data.daily[0].weather[0].icon}.svg`}></img>
            <p>{Math.round((data.daily[0].temp.day - 273.15) * 10) / 10}°C</p>
          </div>
          <div className="flip-card-back">
            <div className="weather-info">
              <img alt="bewolktheid" src={icons.cloudiness}></img>
              <p>{data.daily[0].clouds}%</p>
              <img alt="wind" src={icons.winddirection} style={{transform: `rotate(${data.daily[0].wind_deg + 180}deg)`}}></img>
              <p>{(data.daily[0].wind_speed * 3.6).toFixed(1)} km/h</p>
            </div>
            <div className="weather-info">
              <img alt="regenkans" src={icons.rainchance}></img>
              <p>{(data.daily[0].pop * 100).toFixed(0)}%</p>
              <img alt="uv-index" src={icons.uvindex}></img>
              <p>{(data.daily[0].uvi * 1).toFixed(0)}<br></br>/12</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flip-card">
        <div className="flip-card-inner">
          <div className='flip-card-front'>
            <p>{(new Date((data.daily[1].dt + data.timezone_offset) * 1000)).toLocaleDateString('nl-NL', { weekday: 'long'})}</p>
            <img alt={data.daily[1].weather[0].description} src={`icons/${data.daily[1].weather[0].icon}.svg`}></img>
            <p>{Math.round((data.daily[1].temp.day - 273.15) * 10) / 10}°C</p>
          </div>
          <div className="flip-card-back">
            <div className="weather-info">
              <img alt="bewolktheid" src={icons.cloudiness}></img>
              <p>{data.daily[1].clouds}%</p>
              <img alt="wind" src={icons.winddirection} style={{transform: `rotate(${data.daily[1].wind_deg + 180}deg)`}}></img>
              <p>{(data.daily[1].wind_speed * 3.6).toFixed(1)} km/h</p>
            </div>
            <div className="weather-info">
              <img alt="regenkans" src={icons.rainchance}></img>
              <p>{(data.daily[0].pop * 100).toFixed(0)}%</p>
              <img alt="uv-index" src={icons.uvindex}></img>
              <p>{(data.daily[1].uvi * 1).toFixed(0)}<br></br>/12</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flip-card">
        <div className="flip-card-inner">
          <div className='flip-card-front'>
            <p>{(new Date((data.daily[2].dt + data.timezone_offset) * 1000)).toLocaleDateString('nl-NL', { weekday: 'long'})}</p>
            <img alt={data.daily[2].weather[0].description} src={`icons/${data.daily[2].weather[0].icon}.svg`}></img>
            <p>{Math.round((data.daily[2].temp.day - 273.15) * 10) / 10}°C</p>
          </div>
          <div className="flip-card-back">
            <div className="weather-info">
              <img alt="bewolktheid" src={icons.cloudiness}></img>
              <p>{data.daily[2].clouds}%</p>
              <img alt="wind" src={icons.winddirection} style={{transform: `rotate(${data.daily[2].wind_deg + 180}deg)`}}></img>
              <p>{(data.daily[2].wind_speed * 3.6).toFixed(1)} km/h</p>
            </div>
            <div className="weather-info">
              <img alt="regenkans" src={icons.rainchance}></img>
              <p>{(data.daily[2].pop * 100).toFixed(0)}%</p>
              <img alt="uv-index" src={icons.uvindex}></img>
              <p>{(data.daily[2].uvi * 1).toFixed(0)}<br></br>/12</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flip-card">
        <div className="flip-card-inner">
          <div className='flip-card-front'>
            <p>{(new Date((data.daily[3].dt + data.timezone_offset) * 1000)).toLocaleDateString('nl-NL', { weekday: 'long'})}</p>
            <img alt={data.daily[3].weather[0].description} src={`icons/${data.daily[3].weather[0].icon}.svg`}></img>
            <p>{Math.round((data.daily[3].temp.day - 273.15) * 10) / 10}°C</p>
          </div>
          <div className="flip-card-back">
            <div className="weather-info">
              <img alt="bewolktheid" src={icons.cloudiness}></img>
              <p>{data.daily[3].clouds}%</p>
              <img alt="wind" src={icons.winddirection} style={{transform: `rotate(${data.daily[3].wind_deg + 180}deg)`}}></img>
              <p>{(data.daily[3].wind_speed * 3.6).toFixed(1)} km/h</p>
            </div>
            <div className="weather-info">
              <img alt="regenkans" src={icons.rainchance}></img>
              <p>{(data.daily[3].pop * 100).toFixed(0)}%</p>
              <img alt="uv-index" src={icons.uvindex}></img>
              <p>{(data.daily[3].uvi * 1).toFixed(0)}<br></br>/12</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flip-card">
        <div className="flip-card-inner">
          <div className='flip-card-front'>
            <p>{(new Date((data.daily[4].dt + data.timezone_offset) * 1000)).toLocaleDateString('nl-NL', { weekday: 'long'})}</p>
            <img alt={data.daily[4].weather[0].description} src={`icons/${data.daily[4].weather[0].icon}.svg`}></img>
            <p>{Math.round((data.daily[4].temp.day - 273.15) * 10) / 10}°C</p>
          </div>
          <div className="flip-card-back">
            <div className="weather-info">
              <img alt="bewolktheid" src={icons.cloudiness}></img>
              <p>{data.daily[4].clouds}%</p>
              <img alt="wind" src={icons.winddirection} style={{transform: `rotate(${data.daily[4].wind_deg + 180}deg)`}}></img>
              <p>{(data.daily[4].wind_speed * 3.6).toFixed(1)} km/h</p>
            </div>
            <div className="weather-info">
              <img alt="regenkans" src={icons.rainchance}></img>
              <p>{(data.daily[4].pop * 100).toFixed(0)}%</p>
              <img alt="uv-index" src={icons.uvindex}></img>
              <p>{(data.daily[4].uvi * 1).toFixed(0)}<br></br>/12</p>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

// Styled components
const Wrapper = styled.div`
display: flex;
margin-left: 0.5rem;

.flip-card {
  height: 9rem;
  width: 7rem;
  margin: 0 0.9rem;

  img {
    width: 3.5rem;
  }
}

.flip-card-inner {
  position: relative;
  width: 100%;
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
  backface-visibility: hidden;
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