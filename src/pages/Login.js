import React, {useState} from "react";
import styled from "styled-components";
import Container from "../components/Container.js";
import Wrapper from "../components/Wrapper.js";

const Style = styled.div`
    label {
      text-align: center;
      width: 100%;
      padding-bottom: 0.2rem;
      font-weight: lighter;
      font-size: 1.1rem;
    }
    input {
      margin-left: auto;
      margin-right: auto;
      background-color: #f9f9f9;
      border: 0px;
      padding: 0.2rem 0.3rem;
      -webkit-box-shadow: -2px -3px 4px 5px rgba(255, 255, 255, 0.35);
      box-shadow: -2px -3px 4px 5px rgba(255, 255, 255, 0.35);
      border-bottom: 1px solid #a5a5a5;
    }
    .checkbox {
      display: inline;
      margin: auto;
      margin-top: 0.5rem;
      outline: none;
    }

  .errorText {
    color: red;
  }
`;

const Login = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState();


  const handleSubmit = event => {
  fetch('http://localhost:3000/signin', {
    method: 'post',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify({
    email: email,
    password: password
    })
  })
  .then(response => response.json())
  .then(user => {
    console.log(user);
    if (user.user_id) {
      console.log('logged in');
      props.loadUser(user);  
      props.setRedirectPath("themes");  
    }
    else {
      setErrorText(user);
    }

  })  
  };

  return (
    <Style>
      <Wrapper height="100vh" width='60%' mobilewidth='auto'>
        <Container className="container top">
          <h1>Login</h1>
          <Wrapper>
            <label>email</label>
            <Wrapper>
              <input type="text" onChange={(e)=>{setEmail(e.target.value)}}></input>
            </Wrapper>
            <label>password</label>
            <Wrapper>
              <input type="password" onChange={(e)=>{setPassword(e.target.value)}}></input>
            </Wrapper>
            <div>
              <label>keep me logged in?</label>
              <Wrapper flexdirection='row'>
                <input className="checkbox" type="checkbox" />
              </Wrapper>
            </div>
          </Wrapper>
          <p className='errorText'>{errorText ? errorText : null}</p>

          <div className="buttons">
            <button className="purple-button" onClick={(e)=>{ handleSubmit() }}>Login</button>
          </div>
        </Container>
      </Wrapper>
    </Style>
  );
};

export default Login;
