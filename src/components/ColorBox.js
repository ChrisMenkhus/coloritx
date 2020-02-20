import React, {useState} from "react";
import styled from "styled-components";
import Container from "./Container.js";
import Wrapper from "./Wrapper.js";
import CircularContainer from "./CircularContainer";
import useClippy from 'use-clippy';


const Style = styled.div`
  
  padding: 1rem;

  ion-icon {
    transform: scale(0.8);
    margin: auto;
  }
  ion-icon:hover {
    transform: scale(1.0);
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


`;

const ColorBox = props => {
  const [ clipboard, setClipboard ] = useClippy();
  const [editMode, toggleEditMode] = useState(false);
  const [name, setName] = useState(props.name);
  const [color, setColor] = useState(props.color);
  const id = props.id;

  return (
//     <Style onClick={()=>(
//       props.setSelectedTheme ?
//       props.setSelectedTheme(id) :
//       null
// 
//       )}>
    <Style>
      {/* main wrapper */}
      <Wrapper
        margin={props.margin ? props.margin : '3rem 1rem'}
        height="100%"
        width="100%"
        flexdirection="row"
      >

        {editMode ? 
          <Wrapper flexdirection="collumn" width="auto" margin="0px">
          <Wrapper margin="0px">
            {/* <label>variable name:</label> */}
           {editMode ? 
            <input className='colorInput' defaultValue={props.name ? props.name : 'add title property'}
              onChange={(e)=>{setName(e.target.value)}}
              /> 
            : null}
            {/* Circle */}
            <Wrapper width="7rem" height="7rem" >
              <CircularContainer neoEnabled="true" borderwidth="4px" borderradius='50%' >
                <Wrapper width='80%' height='80%' >
                  <CircularContainer borderradius='50%' colorCircleSize='2rem'
                    bgColor={color ? color : 'white'}
                    borderwidth="0px"
                    shadowBlur="0.2"

                  >
                  <Wrapper flexdirection='column'>
                  <label>color:</label>
                  <input type='text' className='colorInput' value={color}
                    onChange={(e)=>{setColor(e.target.value)}}
                  
                  />
                  <input type='color' className='colorInput' value={color}
                    onChange={(e)=>{setColor(e.target.value)}
                  }
                  />
                  </Wrapper>
                  </CircularContainer>
                </Wrapper>
              </CircularContainer>
            </Wrapper>
          </Wrapper>
        </Wrapper>

        :
        <Wrapper flexdirection="collumn" width="auto" margin="0px">
          <Wrapper margin="0px">
            <h5>
              <div className="neoIt"> {props.name ? props.name : 'add variable name'} </div>
            </h5>
            {/* Circle */}
            <Wrapper width="7rem" height="7rem">
              <CircularContainer neoEnabled="true" borderwidth="4px">
                         
                <Wrapper width={props.colorCircleSize ? props.colorCircleSize : '2rem'} height={props.colorCircleSize ? props.colorCircleSize : '2rem'}>
                  <CircularContainer
                    bgColor={props.color ? props.color : 'white'}
                    borderwidth="0px"
                    shadowBlur="0.2"
                  >
                  {props.iconName ? 
                      <ion-icon name={props.iconName} onClick={props.onClick}></ion-icon> : 
                      props.color ? <h2>{props.color}</h2> : null
                  } 
                  </CircularContainer>
                </Wrapper>
                
              </CircularContainer>
            </Wrapper>
          </Wrapper>
        </Wrapper>
        }
        
        {editMode ? 
        <Wrapper width="auto" margin="0rem 0rem 0rem 1rem" height="68%">
          <Wrapper
            width="1.5rem"
            height="1.5rem"
            margin="auto auto 0.5rem auto"
          >
            <CircularContainer
              bgColor="white"
              borderwidth="0px"
              shadowBlur="0.2"
            >
              <div className='tooltip'>
              <Wrapper width="1rem" height="1rem" className='tooltip' margin='auto' margintop='auto'>
                <ion-icon name="save-outline" onClick={()=>{
                  toggleEditMode(false); props.updateColor(id, color, name);
                  }}></ion-icon>      
              </Wrapper>
                <p className="tooltiptext">save</p>                      
              </div>
            </CircularContainer>
          </Wrapper>
          <Wrapper
            width="1.5rem" height="1.5rem"
            margin="auto auto 0.5rem auto"
          >
            <CircularContainer
              bgColor="white"
              borderwidth="0px"
              shadowBlur="0.2"
            >
            <div className='tooltip'>
              <Wrapper width="1rem" height="1rem">
                <ion-icon name="infinite-outline" onClick={()=>{
                  setColor(props.getRandomColor()); console.log(color);
                  }}></ion-icon>
              </Wrapper>
                <p className="tooltiptext">random color</p>  
              </div>
            </CircularContainer>
          </Wrapper>
          <Wrapper width="1.5rem" height="1.5rem">
            <CircularContainer
              bgColor="white"
              borderwidth="0px"
              shadowBlur="0.2"
            >
            <div className='tooltip'>            
              <Wrapper width="1rem" height="1rem">
                <ion-icon name="close-outline" onClick={()=>{
                  toggleEditMode(false); setColor(props.color);
                  }}></ion-icon>
              </Wrapper>
                <p className="tooltiptext">cancel</p>  
              </div>
            </CircularContainer>
          </Wrapper>
        </Wrapper>
        : null}
        { props.disableButtons ? null :
        !editMode ?    
        <Wrapper width="auto" margin="0rem 0rem 0rem 1rem" height="100%">
          <Wrapper
            width="1.5rem"
            height="1.5rem"
            margin="auto auto 0.5rem auto"
          >
            <CircularContainer
              bgColor="white"
              borderwidth="0px"
              shadowBlur="0.2"
            >
            <div className='tooltip'> 
              <Wrapper width="1rem" height="1rem" >
                <ion-icon name="pencil-outline" onClick={()=>{toggleEditMode(true); }}></ion-icon>
              </Wrapper>
                <p className="tooltiptext">edit</p>  
              </div>
            </CircularContainer>
          </Wrapper>
          <Wrapper width="1.5rem" height="1.5rem"
            margin="auto auto 0.5rem auto"
            >
            <CircularContainer
              bgColor="white"
              borderwidth="0px"
              shadowBlur="0.2"
            >
            <div className='tooltip'>             
              <Wrapper width="1rem" height="1rem">
                <ion-icon name="trash-outline" onClick={()=>{props.deleteColor(id); }}></ion-icon>
              </Wrapper>
                <p className="tooltiptext">delete</p>  
              </div>
            </CircularContainer>
          </Wrapper>

          <Wrapper width="1.5rem" height="1.5rem">
            <CircularContainer
              bgColor="white"
              borderwidth="0px"
              shadowBlur="0.2"
            >
            <div className='tooltip'>                        
              <Wrapper width="1rem" height="1rem">
                <ion-icon name="copy-outline"
                  onClick={()=>{ setClipboard( 
                    color
                  ) }}
                  ></ion-icon>
              </Wrapper>
                <p className="tooltiptext">copy</p>  
              </div>
            </CircularContainer>
          </Wrapper>
        </Wrapper> : null}

        

        
      </Wrapper>
    </Style>
  );
};

export default ColorBox;
