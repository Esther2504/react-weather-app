import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

export default function InputBar({ setCity, location, setLocation }) {
  const [searchinput, changeInput] = useState('');
  const [cities, changeCities] = useState([]);
  const [filteredcities, changeFilter] = useState([]);
  const [inputvalue, changeInputvalue] = useState([]);
  const [coordinates, setCoordinates] = useState()

useEffect(() => {
    if (navigator.geolocation && !navigator.userAgent.includes('Mozilla')) {
      navigator.geolocation.getCurrentPosition((position) => {
        const coordinates = position.coords.latitude + ',' + position.coords.longitude;
        getCurrentLocation(coordinates)
      })
    } else {
      // console.log("Geolocation is not supported by this browser.");
    }
}, [])


function getCurrentLocation(coordinates) {
  fetch(`https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${process.env.REACT_APP_API_KEYACCU}&q=${coordinates}`)
  .then(res => res.json())
  .then(data => {
    setLocation(data)
  })
}


  useEffect(() => {
    fetch(`https://dataservice.accuweather.com/locations/v1/cities/autocomplete?q=${searchinput}&language=nl-nl&apikey=${process.env.REACT_APP_API_KEYACCU}`)
      .then(res => res.json())
      .then(data => {
        changeCities(data)
      })
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
          <input value={inputvalue} autoComplete="off" onChange={showSuggestions} className="input" placeholder="Bv. Amsterdam"></input>
          <div className="suggestions-container">
            {cities?.length > 0 ? (
              <div className="searchbar-suggestions">
                {cities.slice(0, 5).map((val, index) => {
                  return <div onClick={() => {
                    changeInputvalue(val.LocalizedName + ", " + val.Country.LocalizedName);
                    setLocation(val);
                    changeInput();
                    changeCities()
                  }}
                    className="suggests"
                    key={index}>
                    <p>{val.LocalizedName}, {val.Country.LocalizedName}</p>
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
