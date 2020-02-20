import React from 'react';
import styled from 'styled-components'
import Container from '../components/Container.js'
import Wrapper from '../components/Wrapper.js'
import ColorBox from '../components/ColorBox.js'
import * as Colors from '../components/Colors.js'

import codeImg from '../img/codeImg.png'


const Style = styled.div`
    
  .bg1 {
    width: 100%; 
    height: auto;
    background: ${Colors.background_light};
    padding-top: 2rem;

  }
  .bg2 {
    margin-top: 12rem; 
    padding-top: 1rem;
    width: 100%; 
    height: auto;
    padding-bottom: 8rem;
    background: ${Colors.primary};
    background: linear-gradient(0deg, rgba(160,88,213,1) 0%, rgba(199,78,178,1) 100%);
  }

  .circleButtons {
    display: relative;
    bottom: 10;
    background-color: null;
    margin: auto auto 0.5rem auto;
    .circleButton {
      border-radius: 45px;
      width: 15px; height: 15px;
      border: 1px solid #C551B3;
      margin: 0.5rem;
    }
    .active {
      background-color: #C551B3;
    }
  }

  .box {
    height: 100%;
    /*border: 1px solid gray;*/
    margin: 2rem 2rem 0.5rem 2rem;
    display: flex;
    flex-direction: column;

  }

  .colorBox {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }


  .codeImg {
      padding: 0% 10% 0% 10%;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .bannerTitle {
    font-size: 3.5rem;
    padding: 2rem;
  }

`;

const ColoredText = styled.div`
    color: ${props => props.color ? props.color : 'black'};
    display: inline;
    line-height: auto;
    padding: 0px;
  `;

const Home = (props) => {
    console.log(props.loggedIn);
  return (
    <Style>
      <div className='bg1'>
      <Wrapper height='auto'>
      <Container margintop='3rem'>
      <h1><span className='bannerTitle'>Color It X</span><br/><span>Colors For All Projects</span></h1>
      {props.loggedIn === true ? 
      <div className='buttons'>
        <button className='purple-button' onClick={()=>{props.setRedirectPath('themes')}}>
        My Themes
        </button>
      </div>
        :
      <div className='buttons'>
      <button onClick={()=>{props.setRedirectPath('login')}}>
        Login
      </button>
      
      <button className='purple-button' onClick={()=>{props.setRedirectPath('signup')}}>
        Signup
      </button>
      </div>
      }
      </Container>
      </Wrapper>
      </div>
      

      <div className='bg2'>
      <Wrapper height='auto'>
      <Container margintop='-10rem'>
        <h1><span>easily save colors for your web apps</span></h1>
        <div className='box'>
          <div className='colorBox'>
          <ColorBox
                  name="primary"
                  color='#a058d5'
                  colorCircleSize="4rem"
                  disableButtons={true}
                  margin="auto"
          />
          <ColorBox
                  name="secondary"
                  color='#fbbb26'
                  colorCircleSize="4rem"
                  disableButtons={true}
                  margin="auto"
          />
          
          </div>
        {/* <div className='circleButtons'> */}
        {/*   <button className='circleButton'/> */}
        {/*   <button className='circleButton active'/> */}
        {/*   <button className='circleButton'/>          */}
        {/* </div> */}
        </div>
        <div className='buttons'>
        {/* <button> */}
        {/* Try As Guest */}
        {/* </button> */}
        </div>
      </Container>
      </Wrapper>

      <Wrapper height='auto' margin='auto auto 4rem auto'>
      <Container margintop='3rem'>
        <h1><span>export as code to quickly swap colors</span></h1>
        <div className='codeImg'>
          <img src={codeImg}/>
        </div>
        <div className='buttons'>
        <button className='purple-button' onClick={()=>{props.setRedirectPath('signup')}}>
        Signup
        </button>
        </div>
      </Container>
      </Wrapper>
      </div>

      <div className='bg'/>
    </Style>
  );
}

export default Home;
