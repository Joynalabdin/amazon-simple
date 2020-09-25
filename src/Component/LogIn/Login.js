import React, { useContext, useState } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import {createUserWithEmailAndPassword, handleFbSignIn, handleGoogleSignIn, handleSingOut, initializeLoginFramework, signInWithEmailAndPassword} from './LoginManager'



function Login() {
  const [newUser, setNewUsers] = useState(false);
  const [user, setUsers] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    photo: ''
  })
  
  initializeLoginFramework();

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const googleSignIn = ()=>{
      handleGoogleSignIn()
      .then(res=>{
        handleRansponse(res,true);  
      })
  }

  const fbSignIn = () =>{
      handleFbSignIn()
      .then(res=>{
        handleRansponse(res,true);
          
      })
  }

  const singOut = ()=>{
      handleSingOut()
      .then(res=>{
          handleRansponse(res,false);
      })
  }

  const handleRansponse = (res, redirect)=>{
    setUsers(res);
    setLoggedInUser(res);
    if (redirect) {
      history.replace(from);
    }
  }
  
  const handleBlur = (e) => {

    let isFieldValied = true;
    if (e.target.name === 'email') {
      isFieldValied = /\S+@\S+\.\S+/.test(e.target.value)
    }
    if (e.target.name === 'password') {
      const isPasswordValid = e.target.value.length > 7;
      const passwordHasNumber = /\d{1}/.test(e.target.value);
      isFieldValied = isPasswordValid && passwordHasNumber;
    }
    if (isFieldValied) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUsers(newUserInfo);
    }
  }
  const handleSubmit = (e) => {
    if (newUser && user.email && user.password) {
      createUserWithEmailAndPassword(user.email, user.name,user.password)
      .then(res=>{
        handleRansponse(res,true);
        
    })
    }
    if (!newUser && user.email && user.password) {
        signInWithEmailAndPassword(user.email, user.password)
        .then(res=>{
          handleRansponse(res,true);
      })
    }
    e.preventDefault();
  }
    
  return (
    <div style={{textAlign: 'center'}} >
      {
        user.isSignedIn ? <button onClick={singOut} >Sign out</button> :
          <button onClick={googleSignIn} >Sign In</button>
      }
      <br />
      <button onClick={fbSignIn}>Log In Using Facebook</button>
      {
        user.isSignedIn &&
        <div>
          <p> {user.name} </p>
          <p>
            {user.email}
          </p>
          <img src={user.photo} alt=""></img>

        </div>
      }
      <h1>Our Own Authentication</h1>
      <input type="checkbox" onChange={() => setNewUsers(!newUser)} name="newUser" id=""></input>
      <label htmlFor="newUser">New user sign up</label>
      <form onSubmit={handleSubmit} >
        {newUser && <input type="text" onBlur={handleBlur} name="name" placeholder="Your Name" ></input>} <br />
        <input type="text" onBlur={handleBlur} name="email" placeholder="Your Email Address" required></input><br />
        <input type="password" onBlur={handleBlur} name="password" placeholder="Your password" required></input><br />
        <input type="submit" value={newUser? 'Sign up': 'Sign In'}></input><br />
      </form>
      <p style={{ color: "red" }} > {user.error} </p>
      {user.success && <p style={{ color: "green" }}>User {newUser ? 'created' : 'logged In'} successfully</p>}
    </div>
  );
}

export default Login;
