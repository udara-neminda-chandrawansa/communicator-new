import './App.css';
import Nav from './components/Nav';
//import Footer from './components/Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage'; // ViewContacts component for the "/view" route
import LoginPage from './components/LoginPage'; // LoginPage component for the "/about" route
import Dashboard from './components/Dashboard'; // Dashboard component for the "/edit" route

function App() {
  return (
    <Router>
      <Nav/>
      <Routes>
        <Route path="" element={<HomePage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/login/:id" element={<LoginPage/>} />
        <Route path="/login/null" element={<LoginPage/>} />
        <Route path="/secret-dash" element={<Dashboard/>} />
        <Route path={`/login/`+ sessionStorage.getItem('userID') + `/*`} element={<Dashboard/>} />
      </Routes>
    </Router>
  );
  }

export default App;