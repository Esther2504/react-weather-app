import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`


body {
    margin: 0;
    background-color: ${(props) => props.theme.body};
    box-sizing: border-box; 
    font-family: 'Open Sans', sans-serif;
    overflow-x: hidden;
    color: white;
}

.searchbar-suggestions {
  background-color: ${(props) => props.theme.body};
}
`

export const lightTheme = {
    body: "#0686c6",
    fontColor: "white",
  };
  
  export const darkTheme = {
    body: "#464a52",
    fontColor: "white",
  };