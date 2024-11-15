import './App.css';
import Nav from './components/Nav';
//import Footer from './components/Footer';
//import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage'; // ViewContacts component for the "/view" route
import LoginPage from './components/LoginPage'; // LoginPage component for the "/about" route
import Dashboard from './components/Dashboard'; // Dashboard component for the "/edit" route
import { useState } from 'react';

function App() {
  const [activePage, setActivePage] = useState("home");
  //console.log('Active Page:', activePage);
  const changeActivePage = (page) => {
    setActivePage(page);
  };

  return (
    <>
    <Nav changeActivePage = {changeActivePage}/>
    {activePage === "home" && <HomePage/>}
    {activePage === "login" && <LoginPage changeActivePage = {changeActivePage}/>}
    {activePage === "dash/" + sessionStorage.getItem('userID') && <Dashboard changeActivePage = {changeActivePage}/>}
    </>
  );
  }

export default App;

// for vercel