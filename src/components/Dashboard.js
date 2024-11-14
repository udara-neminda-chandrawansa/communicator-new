import Postings from "../dash-components/Postings";
import Settings from "../dash-components/Settings";
import React,{ useState, useEffect } from "react";
import logo from './../logo.jpg';

export default function Dashboard({changeActivePage}) {
  // toggle between elements
  const [activeComponent, setActiveComponent] = useState('postings');
  const [menuOpen, setMenuStatus] = useState(true);

  const handleButtonClick = (component) => {
    setActiveComponent(component);
  };

  const handleLinkClick = (page) => {
    //console.log('Clicked page:', page);
    sessionStorage.removeItem('userID');
    changeActivePage(page);
  }

  // navigate (for logging out)
  //const navigate = useNavigate();

  // useEffect for Menu Status
  useEffect (() => {
    if(menuOpen){
      //console.log("Menu is Open");
      document.getElementById('side-panel').classList.toggle("hide-menu");
      document.getElementById('burgerButton').classList.toggle("move-burger");
      document.getElementById('main-panel').classList.toggle("w-100");
    }else{
      //console.log("Menu is Closed");
      document.getElementById('side-panel').classList.toggle("hide-menu");
      document.getElementById('burgerButton').classList.toggle("move-burger");
      document.getElementById('main-panel').classList.toggle("w-100");
    }
  },[menuOpen])

  return (
    <div className="d-flex flex-mobile common-trans" style={{ minHeight: '60vh' }}>
      <div className="side-panel common-trans" id='side-panel'>
        <div className="glass-container">
          <div className="user-container">
            <img src={logo} alt="" className="user-dp"/>
            <p className="user-name">Udara Neminda</p>
          </div>
          <PostsButton />
          <SettingsButton />
          <LogoutButton />
        </div>
      </div>
      <div className='burger-container common-trans'>
        <div id='burgerButton' className="burgerButton glass-container" onClick={menuOpen ? ()=>setMenuStatus(false) : ()=>setMenuStatus(true)}>
          <i id='burger-icon' className={menuOpen ? "bi bi-arrow-bar-left" : "bi bi-list"} ></i>
        </div>
      </div>
      <div className="main-panel common-trans" id='main-panel'>
        <div id="main-container" className="glass-container">
          {activeComponent === 'postings' && <Postings />}
          {activeComponent === 'settings' && <Settings />}
        </div>
      </div>
    </div>    
  );

  function LogoutButton() {
    return (
      <button onClick={() => handleLinkClick('home')} className="btn btn-side-panel">
        <i className="bi bi-box-arrow-left"></i>
        Logout
      </button>
    );
  }

  function PostsButton() {
    return (
      <button onClick={() => handleButtonClick('postings')} className="btn btn-side-panel">
        <i className="bi bi-chat"></i> 
        Posts
      </button>
    );
  }

  function SettingsButton() {
    return (
      <button onClick={() => handleButtonClick('settings')} className="btn btn-side-panel">
        <i className="bi bi-gear"></i>
        Settings
      </button>
    );
  }
}