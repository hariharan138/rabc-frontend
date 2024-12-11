import React, { useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Bell, ChevronDown, Home, LayoutDashboard,HandHeart , LogOut, Menu, Settings, User } from 'lucide-react'
import './Dash.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const data = [
  { name: 'July', value: 100 },
  { name: 'Aug', value: 200 },
  { name: 'Sep', value: 300 },
  { name: 'Oct', value: 500 },
  { name: 'Nov', value: 800 },
  { name: 'Dec', value: 1000 },
]
const Dashboard = () => {



  const [sidebarOpen, setSidebarOpen] = useState(false)
  let [count,setcount]= useState(0)
  let [active,setactive]= useState(0)
  let [inactive,setinactive]= useState(0)
 let navigate = useNavigate()

 const apiFetch = async () => {
  
  try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/`);
      console.log(response.data.data)
      let usercount = response.data.data.length
      setcount(usercount)
      let activeuserfilter = response.data.data.filter((user) => user.status === "Active");
      let inactiveuserfilter = response.data.data.filter((user) => user.status === "Inactive")
      console.log(activeuserfilter.length)
      setactive(activeuserfilter.length)
      console.log(inactiveuserfilter.length)
      setinactive(inactiveuserfilter.length)
  } catch (err) {
      console.error("Error fetching data", err.message);

  }
};

useEffect(() => {
  apiFetch();
}, []);




  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>Dashboard</h2>
          <button className="icon-button mobile-only" onClick={() => setSidebarOpen(false)}>
            <ChevronDown />
          </button>
        </div>
        <nav className="sidebar-nav">
          <button className="nav-button" onClick={()=>navigate("/Home")}><Home /> Home</button>
          <button className="nav-button" onClick={()=>navigate("/user")}><LayoutDashboard />User</button>
          
          <button className="nav-button" onClick={()=>navigate("/set")}><Settings /> Settings</button>
          <button className="nav-button logout" onClick={()=>navigate("/logout")}><LogOut /> Logout</button>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <header className="header">
          <button className="icon-button mobile-only" onClick={() => setSidebarOpen(true)}>
            <Menu />
          </button>
          <h1>Welcome, Admin</h1>
          <div className="header-actions">
            <input type="search" placeholder="Search..." className="search-input" />
            <button className="icon-button">
              <Bell />
            </button>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="dashboard-content">
          <div className="card-grid">
    
            <div className="card" onClick={()=>navigate("/user")}>
              <div className="card-header">
                <h3>Users</h3>
                <svg viewBox="0 0 24 24" className="card-icon">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <div className="card-content">
                <div className="card-value">{count}</div>
                <p className="card-subtext">updated few seconds ago</p>
              </div>
            </div>
            <div className="card">
              <div className="card-header">
                <h3>Active Users</h3>
                <svg viewBox="0 0 24 24" className="card-icon">
                  <rect width="20" height="14" x="2" y="5" rx="2" />
                  <path d="M2 10h20" />
                </svg>
              </div>
              <div className="card-content" onClick={()=>navigate("/user")}>
                <div className="card-value">{active}</div>
                <p className="card-subtext">updated few seconds ago</p>
              </div>
            </div>
            <div className="card">
              <div className="card-header">
                <h3>Inactive Users</h3>
                <svg viewBox="0 0 24 24" className="card-icon">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </div>
              <div className="card-content" onClick={()=>navigate("/user")}>
                <div className="card-value">{inactive}</div>
                <p className="card-subtext">updated few seconds ago</p>
              </div>
            </div>
          </div>
          <div className="chart-activities-grid">
            <div className="card">
              <div className="card-header">
                <h3>Overview</h3>
              </div>
              <div className="card-content">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="card">
              <div className="card-header">
                <h3>History</h3>
              </div>
              <div className="card-content">
                <ul className="activity-list">
                  <li className="activity-item">
                    <span className="activity-indicator blue"></span>
                    <span className="activity-text">New user registered</span>
                    <span className="activity-time">5 min ago</span>
                  </li>
                  <li className="activity-item">
                    <span className="activity-indicator yellow"></span>
                    <span className="activity-text">System update completed</span>
                    <span className="activity-time">2 hours ago</span>
                  </li>
                  <li className="activity-item">
                    <span className="activity-indicator red"></span>
                    <span className="activity-text">Updated 1 day ago</span>
                    <span className="activity-time">5 hours ago</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Dashboard