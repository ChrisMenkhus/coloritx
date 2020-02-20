import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Container from "../components/Container.js";
import Wrapper from "../components/Wrapper.js";
import CircularContainer from "../components/CircularContainer";
import ColorBox from "../components/ColorBox.js";

import * as Colors from '../components/Colors.js'

import useClippy from 'use-clippy';

const Style = styled.div`
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
  }

  code {
    width: 100%;
    background-color: ${Colors.background_dark};
    text-align: left;
    line-height: 120%;
    padding: 1.5rem;
    p {

      display: inline;
    span {
      color: 'green';
    }
    .space {
      margin-left: 2rem;
    }
  }

  .green {
    text-decoration: underline;
  }
  }

  ion-icon {
    width: 60%; height: 60%;
  }

  .tooltip {
  width: 100%; height: 100%; margin: auto;
  padding: 0px; margin-top: 0.2rem;
  }

  /* Tooltip text */
  .tooltip .tooltiptext {
    font-size: 0.7rem;
    display: none;
    background-color: black;
    color: #fff;
    text-align: center;
    padding: 5px;
    border-radius: 6px;
   
    /* Position the tooltip text - see examples below! */
    position: relative;
    z-index: 500;
    width: fit-content;
    height: auto;
    
  }

  /* Show the tooltip text when you mouse over the tooltip container */
  .tooltip:hover .tooltiptext {
    display: flex;
  }


  .copyBtn {
    margin: auto;
  }

  
`;

  const getRandomColor = () => {
    return (
      '#'+('00000'+(Math.random()*(1<<24)|0).toString(16)).slice(-6)
      );
  }

const Themes = props => {
  const [ clipboard, setClipboard ] = useClippy();
  const [selectedTheme, setTheSelectedTheme] = useState();
  const [selectedThemeName, setSelectedThemeName] = useState();

  const [newColor, setNewColor] = useState("#B265C3");
  const [selectedColor, setSelectedColor] = useState();
  const [newName, setNewName] = useState();
  const [editSelectedThemeName, toggleEditSelectedThemeName] = useState();


  const [listOfThemes, setListOfThemes] = useState([]);
  const [listOfColors, setListOfColors] = useState([]);

  const setSelectedTheme = (theme_id, name) => {
    setTheSelectedTheme(theme_id);
    setSelectedThemeName(name)
    createListOfColors(theme_id);
  };

  useEffect(() => {
    createListOfThemes();
  }, [1]);

  const createListOfThemes = async () => {
    fetch("http://localhost:3000/readthemes", {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        user_id: props.user_id
      })
    })
      .then(response => response.json())
      .then(res => {
        if (res) {
          const themeArray = Object.values(res);
          setListOfThemes(themeArray);
        }
      });
  };

  const createTheme = async () => {
    fetch("http://localhost:3000/createtheme", {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        user_id: props.user_id,
        name: "new theme"
      })
    })
      .then(response => response.json())
      .then(res => {
        if (res) {
          createListOfThemes();
          setSelectedTheme(res.theme_id, res.name)
        }
      });
  };

  const deleteTheme = async () => {
    fetch("http://localhost:3000/deletetheme", {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        theme_id: selectedTheme
      })
    })
      .then(response => response.json())
      .then(res => {
        if (res) {
          setSelectedTheme("", "");
          createListOfThemes();
        }
      });
  };

   const updateTheme = async (id, name) => {
    fetch("http://localhost:3000/updatetheme", {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        theme_id: id,
        name: name
      })
    })
      .then(response => response.json())
      .then(res => {
        if (res) {
          createListOfThemes();
          setSelectedTheme(res.theme_id, res.name)
        }
      });
  };

  const createListOfColors = async theme_id => {
    fetch("http://localhost:3000/readcolors", {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        theme_id: theme_id
      })
    })
      .then(response => response.json())
      .then(res => {
        if (res) {
          const colorsArray = Object.values(res);
          setListOfColors(colorsArray);
        }
      });
  };



  const createColor = async () => {
    fetch("http://localhost:3000/createcolor", {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        theme_id: selectedTheme
      })
    })
      .then(response => response.json())
      .then(res => {
        if (res) {
          createListOfColors(selectedTheme);
        }
      });
  };

  const updateColor = async (id, color, name) => {
    fetch("http://localhost:3000/updatecolor", {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        color_id: id,
        hex: color,
        name: name
      })
    })
      .then(response => response.json())
      .then(res => {
        if (res) {
          createListOfColors(selectedTheme);
        }
      });
  };

  const deleteColor = async (id) => {
    fetch("http://localhost:3000/deletecolor", {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        color_id: id,
      })
    })
      .then(response => response.json())
      .then(res => {
        if (res) {
          createListOfColors(selectedTheme);
        }
      });
  };

  const newListOfColors = listOfColors.map((entry, i) => {
    return (
      <ColorBox
        key={entry.color_id}
        name={entry.name}
        colorCircleSize="4rem"
        color={entry.hex ? entry.hex : "white"}
        margin="auto"
        updateColor={updateColor}
        id={entry.color_id}
        deleteColor={deleteColor}
        getRandomColor={getRandomColor}
      />
    );
  });

  const ColoredText = styled.div`
    color: ${props => props.color ? props.color : 'black'};
    display: inline;
    line-height: 0.5rem;
    padding: 0px;
  `;

  const newJsExportOfColors = listOfColors.map((entry, i) => {
    return (
      <div key={entry.theme_id + i}>
        <p>const <span className='green'>{entry.name ? entry.name : 'null'}</span>{' '} = {"'"}</p>
        <ColoredText color={entry.hex}>{entry.hex}</ColoredText><p>{"'"}{';'}</p>
      </div>
    );
  });
  const newJsExportOfColors2 = listOfColors.map((entry, i) => {
    return (
      <div key={entry.theme_id + i + 1}>
        <p><span className='green space'>{entry.name ? entry.name : 'null'}</span>{','}</p>
      </div>
    );
  });

  const exportText = () => {
    const newJ = listOfColors.map((entry, i) => {
      return ("const " + entry.name + " = '" + entry.hex + "';" + ' ');
    })
    const newJ2 = listOfColors.map((entry, i) => {
      return entry.name + ',';
    })
   return( 
    newJ.join('') + ' export {' +
    newJ2.join('') + '}'
    );
  }


  return (
    <Style>
      {/* { */}
      {/*   props.loggedIn === true ? console.log('logged in') : props.setRedirectPath("home") */}
      {/*   } */}
      <Wrapper flexdirection="row" mobileflexdirection='column' height="100vh" mobileheight='auto'>
        {/* Themes Navigation Bar */}
        <Wrapper width="auto" mobilewidth='100%' margin="auto auto auto auto" height="80vh" mobileheight='100%'>
          <Container height="100%" width="auto" scroll={true}>
            <h1>
              <span>themes</span>
            </h1>
            <Wrapper flexdirection="column" height="fit-content">
              {/* new color button */}
              <ColorBox
                name="create new theme"
                color={Colors.background_light_neo}
                disableButtons={true}
                iconName="create-outline"
                colorCircleSize="3rem"
                margin="0rem"
                onClick={() => {
                  createTheme();
                }}
              />
              {listOfThemes.map((entry, i) => {
                return (
                  <ColorBox
                    key={i}
                    name={entry.name}
                    disableButtons={true}
                    colorCircleSize="3rem"
                    color={Colors.background_light_neo}
                    // the place to get color
                    margin="0rem"
                    iconName="open-outline"
                    onClick={() => {
                      setSelectedTheme(entry.theme_id, entry.name);                    
                    }}
                  />
                );
              })}
            </Wrapper>
          </Container>
        </Wrapper>
        {/* Selected Theme Viewer */}
        <Wrapper flexdirection='column' margin="10vh 1rem auto 0rem" width='80%' height='auto' mobilewidth='100%' mobileheight='auto'>
        <Wrapper width="100%" margin="auto auto auto 0rem" height='auto'>
          <Container width="100%" height='100%'>
            <Wrapper flexdirection="row" width="auto">
              {editSelectedThemeName ?
                <input defaultValue={selectedThemeName ? selectedThemeName : 'add variable name'}
              onChange={(e)=>{setSelectedThemeName(e.target.value)}} />
                :
              <h1>
                <span>{selectedTheme ? selectedThemeName : "select a theme"}</span>
              </h1>
              }
              {selectedTheme ? (
                <Wrapper flexdirection='row' width='fit-content' margin='0.5rem'>
                <Wrapper
                  width="1.5rem"
                  height="1.5rem"
                  className="selectedThemeButtonContainer"
                  margin="0.5rem"
                >
                  <CircularContainer
                    bgColor="white"
                    borderwidth="0px"
                    shadowBlur="0.2"
                  >
                  <div className='tooltip'> 
                    <ion-icon
                      onClick={() => {
                        if (editSelectedThemeName) {
                          updateTheme(selectedTheme, selectedThemeName);
                        }

                        toggleEditSelectedThemeName(!editSelectedThemeName);
                      }}
                      name={editSelectedThemeName ? 'save-outline' : 'pencil-outline'}
                    ></ion-icon>
                    <p className="tooltiptext">edit</p> 
                  </div>
                  </CircularContainer>
                </Wrapper>
                <Wrapper
                  width="1.5rem"
                  height="1.5rem"
                  className="selectedThemeButtonContainer"
                  margin="0.5rem"
                >
                  <CircularContainer
                    bgColor="white"
                    borderwidth="0px"
                    shadowBlur="0.2"
                  >
                  <div className='tooltip'> 

                    <ion-icon
                      onClick={() => {
                        deleteTheme();
                      }}
                      name="trash-outline"
                    ></ion-icon>
                    <p className="tooltiptext">delete</p> 
                  </div>
                  </CircularContainer>
                </Wrapper>
                </Wrapper>
              ) : null}
            </Wrapper>

            <div className="grid">
              {/* new color button */}
              {selectedTheme ? (
                <ColorBox
                  name="add new color"
                  iconName="add-circle-outline"
                  colorCircleSize="3rem"
                  disableButtons={true}
                  margin="auto"
                  onClick={() => {
                    createColor();
                  }}
                />
              ) : null}
              {newListOfColors}
            </div>
          </Container>
        </Wrapper>

          {/* Selected Theme Export */}
          {selectedTheme ? 
        <Wrapper width="100%" margin="auto auto 10vh auto" height='auto'>
          <Container width="100%"margintop="3rem" height='100%'>
            <h1>
              <span>colors.js</span>
            </h1>
            <Wrapper margin='auto auto 3rem auto' width='70%'>
            <code>
            {newJsExportOfColors}
            <p>export {' {'}</p>
            {newJsExportOfColors2}
            <p>{'}'}</p>
            <Wrapper
                  width="1.5rem"
                  height="1.5rem"
                  className="selectedThemeButtonContainer"
                  margin="auto 0.5rem auto auto"
                >
                  <CircularContainer
                    bgColor="white"
                    borderwidth="0px"
                    shadowBlur="0"
                  >
                  {/* <div className='tooltip'>  */}

                    <ion-icon className='copyBtn'                    
                      name="copy-outline"
                      onClick={()=>{ setClipboard( 
                          (exportText())
                        ) }}
                    ></ion-icon>
                    {/* <p className='tooltiptext'>copy</p> */}
                  {/* </div> */}
                  </CircularContainer>
              </Wrapper>
            </code>
            </Wrapper>
          </Container>
          </Wrapper>
          :
          null }
      </Wrapper>
      </Wrapper>
    </Style>
  );
};

export default Themes;
