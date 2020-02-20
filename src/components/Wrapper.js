import React from "react";
import styled from "styled-components";

const Style = styled.div`
  display: flex;
  flex: wrap;
  height: ${props => props.height ? props.height : 'auto'};
  width: ${props => props.width ? props.width : '100%'};
  margin: ${props => props.margin ? props.margin : 'auto'};
  flex-direction: ${props => props.flexdirection ? props.flexdirection : 'column'};

  justify-content: center; justify-self: center; align-items: center;

  overflow: ${props => props.scroll ? 'scroll' : null};

  @media screen and (max-width: 992px) {

    flex-direction: ${props => props.mobileflexdirection ? props.mobileflexdirection : props.flexdirection ? props.flexdirection : 'column'};
    width: ${props => props.mobilewidth ? props.mobilewidth : props.width ? props.width : '100%'};
    height: ${props => props.mobileheight ? props.mobileheight : props.height ? props.height : 'auto'};
  }
  
`;

const Container = props => {
  const {height, width, margin, flexdirection, scroll, mobileflexdirection, mobilewidth, mobileheight} = props;
  return(
  <Style
    height={height}
    width={width}
    margin={margin}
    flexdirection={flexdirection}
    mobileflexdirection={mobileflexdirection}
    scroll={scroll}
    mobilewidth={mobilewidth}
    mobileheight={mobileheight}
  >
  {props.children}
  </Style>);
};

export default Container;
