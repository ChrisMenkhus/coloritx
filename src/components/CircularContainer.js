import React from "react";
import styled from "styled-components";
import Container from "../components/Container.js";
import Wrapper from "../components/Wrapper.js";

const Style = styled.div`
  display: flex; margin: auto auto;
  background-color: ${props => props.neoEnabled ? 'null' : props.bgColor ? props.bgColor : '#F9F9F9'};
  height: 100%; width: 100%;
  
  border: 8px solid #F9F9F9;
  border-width: ${props => props.borderwidth ? props.borderwidth : '8px'};
  border-radius: ${props => props.borderradius ? props.borderradius : '50%'};
  line-height: 100%;
  //dark shadow
  box-shadow: 4px 2px 6px rgb(25,25,25, ${props => props.shadowBlur ? props.shadowBlur : '0.08'} ), -4px -6px 8px rgba(255,255,255, ${props => props.shadowBlur ? props.shadowBlur : '0.08'} );
  



  //light shadow
  .neo {
  margin: 0px;

    height: 100%; width: 100%; 
    border-radius: ${props => props.borderradius ? props.borderradius : '50%'}; 
    display: flex; margin: auto;
    box-shadow: ${props => props.neoEnabled ? 
      'inset 4px 2px 6px rgb(25,25,25,0.1),  inset -4px -6px 8px rgba(255,255,255, 0.5)'
      :
      'none'
    };

  }
`;

const CircularContainer = props => {
  return (
    <Style neoEnabled={props.neoEnabled} bgColor={props.bgColor}
      borderwidth={props.borderwidth}
      shadowBlur={props.shadowBlur}
      borderradius={props.borderradius}
      onClick={props.onClick}
      >
      <div className='neo'>
      {props.children}
      </div>
    </Style>
  );
};

export default CircularContainer;
