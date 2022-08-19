import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

export default function InputBar({ setCity }) {
  const [searchinput, changeInput] = useState('');
  const [cities, changeCities] = useState([]);
  const [filteredcities, changeFilter] = useState([]);
  const [inputvalue, changeInputvalue] = useState([]);

  // Steden ophalen van externe json
  useEffect(() => {
    fetch(`https://raw.githubusercontent.com/lutangar/cities.json/master/cities.json`)
      .then(res => res.json())
      .then(data => {
        changeCities(data)
      })
  }, [searchinput])

  // De steden filteren op basis van de input en in results plaatsen
  let results = []

  useEffect(() => {
    if (searchinput.length > 3) {
      results = cities.filter((item) => {
        return item.name.toLowerCase().includes(searchinput.toLowerCase())
      })
    } else if (searchinput.length < 4) {
      results = ""
    } else if (searchinput.value = "") {
      results = ""
    }
    changeFilter(results)
  }, [searchinput])

  // Input doorgeven aan de location API, daarna input verwijderen van zoekbalk
  function searchLocation() {
    const input = document.querySelector(".input")
    setCity(input.value)
    input.value = ""
    changeFilter("")
    changeInputvalue("")
  }

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
          <button className="button" onClick={searchLocation}>Zoeken</button>
          <div className="suggestions-container">
            {filteredcities ? (
              <div className="searchbar-suggestions">
                {filteredcities.slice(0, 5).map((val, index) => {
                  return <div onClick={() => {
                    changeInputvalue(val.name + ", " + val.country);
                    changeFilter("")
                  }}
                    className="suggests"
                    key={index}>
                    <p>{val.name}, {val.country}</p>
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
