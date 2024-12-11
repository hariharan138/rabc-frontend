import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ChevronDown, Home, LayoutDashboard, User, Settings, LogOut, Menu, Plus, Edit, Trash2 } from 'lucide-react';
import './AllUser.css';
import { useNavigate } from 'react-router-dom';
import AddUserPopup from './AddUserPopup';

const AllUser = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [apidata, setApidata] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showAddUserPopup, setShowAddUserPopup] = useState(false);
    const [showEditUserPopup, setShowEditUserPopup] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const navigate = useNavigate();

    const apiFetch = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await axios.get("http://localhost:3000/api/users/");
            setApidata(response.data.data);
        } catch (err) {
            console.error("Error fetching data", err.message);
            setError("Failed to fetch user data. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        apiFetch();
    }, []);

    const handleAddUser = () => {
        setShowAddUserPopup(true);
    };

    const handleClosePopup = () => {
        setShowAddUserPopup(false);
        setShowEditUserPopup(false);
        setSelectedUser(null);
    };

    const handleUserAdded = () => {
        apiFetch();
    };

    const handleEditUser = (user) => {
        setSelectedUser(user);
        setShowEditUserPopup(true);
    };

    const handleDeleteUser = async (userId) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                await axios.delete(`http://localhost:3000/api/users/${userId}`);
                alert("User deleted successfully!");
                apiFetch(); // Refresh the user list after deletion
            } catch (err) {
                console.error("Error deleting user:", err.message);
                alert("Failed to delete user. Please try again.");
            }
        }
    };

    return (
        <div className="dashboard">
            <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <h2>Dashboard</h2>
                    <button
                        className="icon-button mobile-only"
                        onClick={() => setSidebarOpen(false)}
                        aria-label="Close sidebar"
                    >
                        <ChevronDown />
                    </button>
                </div>
                <nav className="sidebar-nav">
                    <button className="nav-button" onClick={() => navigate("/Home")}><Home /> Home</button>
                    <button className="nav-button" onClick={() => navigate("/user")}><LayoutDashboard /> User</button>
                    <button className="nav-button" onClick={() => navigate("/set")}><Settings /> Settings</button>
                    <button className="nav-button logout" onClick={() => navigate("/logout")}><LogOut /> Logout</button>
                </nav>
            </aside>

            <div className="main-content">
                <header className="header">
                    <button
                        className="icon-button mobile-only"
                        onClick={() => setSidebarOpen(true)}
                        aria-label="Open sidebar"
                    >
                        <Menu />
                    </button>
                    <h1>All Users</h1>
                    <button className="add-user-button" onClick={handleAddUser}>
                        <Plus /> Add User
                    </button>
                </header>

                <main className="dashboard-content">
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p className="error-message">{error}</p>
                    ) : (
                        <div className="card-grid">
                            {apidata.length > 0 ? (
                                apidata.map((data) => (
                                    <div key={data._id} className="card">
                                        <div className="card-header">
                                            <h3>{data.firstname} {data.lastname}</h3>
                                        </div>
                                        <div className="card-content">
                                            <p>Email: {data.email}</p>
                                            <p>Role: {data.role}</p>
                                            <p>Status: {data.status}</p>
                                        </div>
                                        <div className="card-footer">
                                            <button
                                                className="edit-button"
                                                onClick={() => handleEditUser(data)}
                                            >
                                                <Edit /> Edit
                                            </button>
                                            <button
                                                className="delete-button"
                                                onClick={() => handleDeleteUser(data._id)}
                                            >
                                                <Trash2 /> Delete
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No users found</p>
                            )}
                        </div>
                    )}
                </main>
            </div>

            {showAddUserPopup && (
                <AddUserPopup onClose={handleClosePopup} onUserAdded={handleUserAdded} />
            )}

            {showEditUserPopup && selectedUser && (
                <EditUserPopup
                    user={selectedUser}
                    onClose={handleClosePopup}
                    onUserUpdated={apiFetch}
                />
            )}
        </div>
    );
};

const EditUserPopup = ({ user, onClose, onUserUpdated }) => {
    const [formData, setFormData] = useState({
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        mobile: user.mobile,
        password: '',
        gender: user.gender,
        role: user.role,
        status: user.status
    });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (!formData.firstname || !formData.lastname || !formData.email || !formData.mobile) {
            setError("All fields except password are required!");
            return;
        }

        try {
            const response = await axios.put(`http://localhost:3000/api/users/${user._id}`, formData);

            if (response.status === 200) {
                alert("User updated successfully!");
                onUserUpdated();
                onClose();
            }
        } catch (err) {
            console.error("Error updating user:", err.message);
            setError(err.message);
        }
    };

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <h2>Edit User</h2>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="firstname">First Name:</label>
                        <input
                            type="text"
                            id="firstname"
                            name="firstname"
                            value={formData.firstname}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastname">Last Name:</label>
                        <input
                            type="text"
                            id="lastname"
                            name="lastname"
                            value={formData.lastname}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="mobile">Mobile:</label>
                        <input
                            type="text"
                            id="mobile"
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleChange}
                            maxLength="10"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            minLength="6"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="gender">Gender:</label>
                        <select
                            id="gender"
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                        >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="others">Others</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="role">Role:</label>
                        <select
                            id="role"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                        >
                            <option value="User">User</option>
                            <option value="Admin">Admin</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="status">Status:</label>
                        <select
                            id="status"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                        >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>
                    <div className="form-actions">
                        <button type="submit">Save Changes</button>
                        <button type="button" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AllUser;

