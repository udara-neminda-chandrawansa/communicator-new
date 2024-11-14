import logo from "./../logo.jpg"
import React from "react";

export default function Nav({changeActivePage}) {
  //const [loginLink, setLoginLink] = useState("login");
  //const [userID, setUserID] = useState('');


  const handleLinkClick = (page) => {
    changeActivePage(page);
  }

  const handleLogin = () => {
    if(sessionStorage.getItem('userID')){
      handleLinkClick('dash/' + sessionStorage.getItem('userID'));
    }else{
      handleLinkClick('login');
    }
  }
  
  
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
              <p className="nav-link active m-0" style={{cursor: 'pointer'}} aria-current="page" onClick={() => handleLinkClick('home')}>Home</p>
            </li>
            <li className="nav-item">
              <p className="nav-link active m-0" style={{cursor: 'pointer'}} onClick={handleLogin}>Login</p>
            </li>
            <li className="nav-item dropdown">
              <p className="nav-link dropdown-toggle active m-0" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Useful Links
              </p>
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