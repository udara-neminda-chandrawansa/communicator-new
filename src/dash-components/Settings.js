// Settings.js
import React, { useState } from 'react';
import axios from 'axios';

function Settings(){
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  /*handle username | password change*/
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    //console.log(username);
  }
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    //console.log(password);
  }

  const updateProfile = () => {
    if(username !== "" && password !== ""){
      let input = [username , password , sessionStorage.getItem('userID')];
      axios.post('http://edgewise.kesug.com/react-apis/unc-communicator/user-manager/',input)
      .then(function (response) {
        console.log(response.data);
        alert(response.data["message"]);
      })
      .catch(function (error) {
        console.error('Error during post API request:', error);
      });    
    }else{
      alert("Invalid Username and Password!");
    }
  }  

  return (
    <div style={{display:'flex', padding: '1em', height: '100%', overflowY: 'scroll', width: '100%',flexDirection:'column' }}>
      <h1 style={{ color: 'white', width: '100%', height:'fit-content'}}>Settings</h1>
      <hr />
      <div className="w-100 p-3">
        <h3 style={{color:'white'}}><i className="bi bi-person-circle"></i> Account Management</h3>
        <label htmlFor="username" className='mt-3'>Username</label>
        <input type="text" name="username" id="username" className='form-control mt-3' onChange={handleUsernameChange} value={username}/>
        <label htmlFor="password" className='mt-3'>Password</label>
        <input type="text" name="password" id="password" className='form-control mt-3' onChange={handlePasswordChange} value={password}/>
        <SaveButton/>
        <hr />
      </div>
    </div>
  );

  function SaveButton(){
    return(
      <button className='btn glass-container mt-3' style={{height:'3rem' , width:'5rem' , color:'white'}} onClick={()=> updateProfile()}><i className="bi bi-floppy"></i> Save</button>
    );
  }
};

export default Settings;