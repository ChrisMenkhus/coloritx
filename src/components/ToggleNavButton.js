import React from 'react';
import styled from 'styled-components'

const Style = styled.div`
    
    position: fixed;
    top: 0;

    width: 100%;
    display: flex;

    width: 34px; height: 34px;
    margin-right: auto;
    margin-left: 1.5rem;
    margin-top: 20px;
    background-color: #1D2224;
    border-radius: 15px;



    ion-icon {     
      color: white;
      width: 20px; height: 20px;
      margin: auto;   
    }
`;


function ToggleNavButton(props) {
  return (
      <Style onClick={()=>{
        props.toggleNav(!props.navToggled)
        }}>
          <ion-icon name="grid-outline"></ion-icon>    
      </Style>
  );
}

export default ToggleNavButton;
