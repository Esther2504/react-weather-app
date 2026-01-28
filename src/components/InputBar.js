import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

export default function InputBar({ setCity, location, setLocation }) {
  const [searchinput, changeInput] = useState('');
  const [cities, changeCities] = useState([]);
  const [filteredcities, changeFilter] = useState([]);
  const [inputvalue, changeInputvalue] = useState([]);
  const [coordinates, setCoordinates] = useState()

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      fetch(`https://geocode.maps.co/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&namedetails=0&accept-language=nl&api_key=${process.env.REACT_APP_API_KEY}`)
        .then(res => res.json())
        .then(data => {
          setLocation({ lat: position.coords.latitude, lon: position.coords.longitude, display_name: data.address.village + ", " + data.address.country })
        })
        .catch(error => {
          throw (error);
        })
    });
  }, [window])

  const allowedTypes = ["city", "town", "village"]

  useEffect(() => {
    if (searchinput) {
      fetch(`https://geocode.maps.co/search?city=${searchinput}&addressdetails=0&namedetails=0&accept-language=nl&extratags=0&api_key=${process.env.REACT_APP_API_KEY}`)
        .then(res => res.json())
        .then(data => {
          changeCities(data.filter(result =>
            allowedTypes.includes(result.addresstype)
          ))
        })
        .catch(error => {
          throw (error);
        })
    }
  }, [searchinput])

  // Bij onChange worden de input states geupdate, waardoor de input gebruikt kan worden voor het filteren en laten zien van de suggesties
  function showSuggestions(e) {
    changeInputvalue(e.target.value)
    changeInput(e.target.value)
  }

  return (
    <>
      <div className="search-container">
        <div className="search-inner">
          <input value={inputvalue} autoComplete="off" onChange={showSuggestions} className="input" placeholder="Zoek een plaats"></input>
          <div className="suggestions-container">
            {cities?.length > 0 ? (
              <div className="searchbar-suggestions">
                {cities.slice(0, 5).map((val, index) => {
                  return <div onClick={() => {
                    changeInputvalue(val.display_name);
                    setLocation(val);
                    changeInput();
                    changeCities()
                  }}
                    className="suggests"
                    key={index}>
                    <p>{val.display_name}</p>
                  </div>
                }
                )}
              </div>
            ) :
              <></>
            }
          </div>
        </div>
      </div>
    </>
  )
}
