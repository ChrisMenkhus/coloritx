import React from "react";
import styled from "styled-components";

const Style = styled.div`
  width: auto;
  //min-width: 350px;
  //max-width: 600px;
  background-color: ${props => props.bgcolor ? props.bgcolor : '#f3f3f3'}; 
  margin: 3rem auto 1rem auto;
  border: 1px solid #fafafa;
  border-radius: 1rem;
  height: ${props => props.height ? props.height : 'auto'};
  margin-top: auto; margin-bottom: auto;
  margin-left: auto; margin-right: auto;
  margin: ${props => props.margin ? props.margin : 'auto 1rem auto 1rem'};
  margin-top: ${props => props.margintop ? props.margintop : 'auto'};
  width: ${props => props.width ? props.width : '60%'};
  padding: 0px;

  overflow-y: ${props => props.scroll ? 'scroll' : null};

  @media screen and (max-width: 992px) {

    width: 100%;
  }
`;

const Container = props => {
  return <Style 
  margintop={props.margintop}
  width={props.width}
  margin={props.margin}
  height={props.height}
  bgcolor={props.bgcolor}
  scroll={props.scroll}
  >{props.children}</Style>;
};

export default Container;
