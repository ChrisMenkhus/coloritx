import React from "react";
import styled from "styled-components";

const TopButtonContainer = styled.div`
  width: 100%;
  height: auto;
  margin-bottom: auto;
  display: flex;
  flex-direction: row;
  margin-bottom: 1rem;
`;

const NavButton = styled.div`
  width: 100%;
  display: flex;
  width: 34px;
  height: 34px;
  margin-left: auto;
  margin-right: 1.5rem;
  margin-top: 20px;
  background-color: #f9f9f9;
  border-radius: 15px;
  ion-icon {
    color: #545454;
    width: 30px;
    height: 30px;
    margin: auto;
  }

  transition: all 0.1s;
  
`;

const Nav = styled.nav`
  width: 100%;
  height: auto;
  margin-bottom: auto;
  margin: 0px 3rem 3rem 0rem;
`;

const NavItems = styled.div`
  margin: auto 0rem auto 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(8rem, 1fr));
  grid-auto-rows: 1fr;
  gap: 0.5rem;

  &::before {
    content: "";
    padding-bottom: 100%;
    grid-row: 1 / 1;
    grid-column: 1 / 1;
  }

  & > *:first-child {
    grid-row: 1 / 1;
    grid-column: 1 / 1;
  }
`;

const NavItem = styled.div`
  background-color: #f4f4f4;
  border-bottom: solid 8px;
  border-color: ${props => (props.bordercolor ? props.bordercolor : "red")};
  transition: all 0.1s;
  display: flex;
  flex-direction: column;

  h4 {
    margin: auto auto 0px auto;
    color: #232323;
    font-weight: normal;
  }

  ion-icon {
    width: 2rem;
    height: 2rem;
    padding-top: 3rem;
    margin: auto auto auto auto;
    color: ${props => (props.bordercolor ? props.bordercolor : "red")};
    transition: all 0.05s;
  }

  &:hover {
    margin: 0.2rem;
  }
`;

  const OpenStyle = styled.div`
    display: flex;
    flex-wrap: wrap;
    position: fixed;
    top: 0;
    z-index: 1;
    overflow-x: hidden;
    background-color: #1d2224;
    height: 100%;
    width: 25vw;

    @media only screen and (max-width: 1200px) {
      height: 100vh;
      width: 100vw;
    }
  `;

  const ClosedStyle = styled.div`
    display: flex;
    flex-wrap: wrap;
    position: fixed;
    top: 0;
    z-index: 1;
    overflow-x: hidden;
    background-color: #1d2224;
    height: 100%;
    width: 0vw;
  `;

const BigNavbar = props => {
  const NavContainer =
    props.navToggled === true ? OpenStyle : ClosedStyle;

  return (
    <NavContainer>
      <TopButtonContainer>
        <NavButton
          onClick={() => {
            props.toggleNav(false);
          }}
        >
          <ion-icon name="close-circle-outline"></ion-icon>
        </NavButton>
      </TopButtonContainer>
      
      <Nav>
        <NavItems>
          <NavItem
            bordercolor="#FF66A3"
            onClick={() => {
              props.setRedirectPath("home");
              props.toggleNav(false);
            }}
          >
            <ion-icon name="home-outline"></ion-icon>
            <h4>home</h4>
          </NavItem>
          <NavItem bordercolor="#3CBBEA">
            <ion-icon name="help-circle-outline"></ion-icon>
            <h4>information</h4>
          </NavItem>
          {props.loggedIn ? 
          <NavItem bordercolor="#9F63ED"
            onClick={() => {
              props.setRedirectPath("themes");
              props.toggleNav(false);
            }}
          >
            <ion-icon name="color-palette-outline"></ion-icon>
            <h4>themes</h4>
          </NavItem> : null }
          {props.loggedIn ?  
          <NavItem bordercolor="#F6BC4B">
            <ion-icon name="person-circle-outline"></ion-icon>
            <h4>account</h4>
          </NavItem>
          :
          <NavItem
            bordercolor="#F6BC4B"
            onClick={() => {
              props.setRedirectPath("login");
              props.toggleNav(false);
            }}
          >
            <ion-icon name="log-in-outline"></ion-icon>
            <h4>sign in</h4>
          </NavItem>
          }

          {props.loggedIn ?
          <NavItem bordercolor="#F6BC4B">
            <ion-icon name="log-out-outline" onClick={()=>{props.logOut();
              props.setRedirectPath("home") }}
              ></ion-icon>
            <h4>logout</h4>
          </NavItem>
            :
          <NavItem
            bordercolor="#F6BC4B"
            onClick={() => {
              props.setRedirectPath("signup");
              props.toggleNav(false);
            }}
          >
            <ion-icon name="person-add-outline"></ion-icon>
            <h4>sign up</h4>
          </NavItem>
          }

          

          
          
          
          
          
        </NavItems>
      </Nav>
    </NavContainer>
  );
};

export default BigNavbar;
