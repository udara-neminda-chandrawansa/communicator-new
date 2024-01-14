import logo from "./../logo.jpg"
import React, { useEffect, useState } from "react";

function Nav() {
  const [loginLink, setLoginLink] = useState('');
  const [userID, setUserID] = useState('');

  useEffect(() => {
    setUserID(sessionStorage.getItem('userID'));
  }, []); // Empty dependency array to run the effect only once

  useEffect(() => {
    if (userID !== null) {
      setLoginLink(`/login/${userID}`);
    } else {
      setLoginLink('/login');
    }
  }, [userID]);
  
  return(
    <>
      <nav className="navbar navbar-expand-lg" style={{background:'linear-gradient(45deg,var(--com-purple),var(--com-pink))'}} data-bs-theme="dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <img src={logo} alt="ii" style={{height:'35px'}}/>
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" href={loginLink}>Login</a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle active" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Useful Links
              </a>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="https://drive.google.com/drive/home">Google Drive</a></li>
                <li><a className="dropdown-item" href="https://onedrive.live.com/?id=root&cid=EC87CC99EE7BF7F8">OneDrive</a></li>
                <li><hr className="dropdown-divider"/></li>
                <li><a className="dropdown-item" href="https://web.whatsapp.com/">WhatsApp Web</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>    
    </>
  );
}
export default Nav;