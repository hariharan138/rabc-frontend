import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import SetPage from './SetPage'; // Assuming you have a settings page.
import AllUser from './AllUser';
// import AllTrust from './AllTrust';
import LogoutDashboard from './LogoutDashboard';

import RegistrationForm from './Registration/RegistrationForm';
import LoginForm from './Login/LoginForm';


function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<LoginForm/>} />
      <Route path="/register" element={<RegistrationForm/>} />
      <Route path="/login" element={<LoginForm/>} />


        {/* protected routes */}
        <Route path="/Home" element={<Dashboard/>} />
        <Route path="/user" element={<AllUser/>} />
        <Route path="/set" element={<SetPage />} />

        <Route path="/logout" element={<LogoutDashboard/>} />
     
     
      </Routes>
    </Router>
  );
}

export default App;
