//import { Link } from "react-router-dom";
import React,{ useState } from "react";
import axios from "axios";

export default function LoginPage({changeActivePage}){
    const [inputs, setInputs] = useState({
        username: '',
        password: '',
    });
    
    const handleLinkClick = (page) => {
        //console.log('Clicked page:', page);
        changeActivePage(page);
    }
      
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs((prevInputs) => ({
          ...prevInputs,
          [name]: value,
        }));
    };
    
    const login = () => {
        if (Object.values(inputs).every((input) => input !== '')) {
          axios.post('http://localhost/react-apis/unc-communicator/login-api/', inputs).then(function (response) {
            // Check if response.data[0] is defined and has 'userID'
            if (response.data[0] && response.data[0]['userID'] !== undefined) {
                sessionStorage.setItem('userID',response.data[0]['userID']); // set userID session var
                //alert(sessionStorage.getItem('userID'));
                //window.location.href='/login/' + sessionStorage.getItem('userID');
                handleLinkClick('dash/' + sessionStorage.getItem('userID'));
            } else { // error handling
                console.error('Invalid or missing user data in the response:', response.data);
            }})
            .catch(function (error) {
                console.error('Error during login API request:', error);
            });
        }
    };

    return(
        <>
        <div style={{height:'90vh', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center',background:'linear-gradient(45deg,var(--com-light-blue),var(--com-pink))'}}>
            <div className="d-flex flex-column gap-3 rounded-4" style={{background:'linear-gradient(180deg,var(--com-purple),var(--com-pink))', padding:'30px', color:'#fff'}}>
                <label htmlFor="username">Username</label>
                <input type="text" className="form-control form-control-sm" name="username" id="username" value={inputs.username} onChange={handleChange}/>
                <label htmlFor="password">Password</label>
                <input type="text" className="form-control form-control-sm" name="password" id="password" value={inputs.password} onChange={handleChange}/>
                <div className="d-flex justify-content-between w-100 gap-3">
                    <LoginButton/>
                </div>
            </div>
        </div>
        </>
    );
    function LoginButton(){
        return(
            <button onClick={login} className="btn btn-sm btn-login w-100">
                Login
            </button>
        );
    }
}