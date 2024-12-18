import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import swal from 'sweetalert';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Header() {
    const name = localStorage.getItem('name');
    const navigate = useNavigate();
    const location = useLocation();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
    }, [location]);

    const handleLogout = () => {
        swal({
            title: 'Are you sure?',
            text: 'You will be logged out and redirected to the login page.',
            icon: 'warning',
            buttons: ['Cancel', 'Log Out'],
            dangerMode: true,
        }).then((willLogout) => {
            if (willLogout) {
                localStorage.clear();
                setIsLoggedIn(false);
                swal('You have successfully logged out!', { icon: 'success' });
                navigate('/');
            }
        });
    };

    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow fixed-top">
                <div className="container">
                    {/* Brand */}
                    <Link to="/" className="navbar-brand fw-bold">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/3902/3902360.png"
                            alt="Logo"
                            className="me-2"
                            style={{ height: '40px' }}
                        />
                        Task Manager
                    </Link>

                    {/* Toggler Button */}
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* Navbar Items */}
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <NavLink
                                    to="/dashboard"
                                    className={({ isActive }) =>
                                        `nav-link ${isActive ? 'active text-warning fw-bold' : ''}`
                                    }
                                >
                                    Dashboard
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    to="/createEmployee"
                                    className={({ isActive }) =>
                                        `nav-link ${isActive ? 'active text-warning fw-bold' : ''}`
                                    }
                                >
                                    Create Task
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    to="/employeeList"
                                    className={({ isActive }) =>
                                        `nav-link ${isActive ? 'active text-warning fw-bold' : ''}`
                                    }
                                >
                                    Task List
                                </NavLink>
                            </li>
                        </ul>

                        {/* Right-Side Content */}
                        <div className="d-flex align-items-center">
                            {isLoggedIn && (
                                <span className="text-light me-3 fw-bold">Welcome, {name}</span>
                            )}
                            {isLoggedIn ? (
                                <button
                                    className="btn btn-outline-danger btn-sm"
                                    onClick={handleLogout}
                                >
                                    Log Out
                                </button>
                            ) : (
                                <Link to="/login" className="btn btn-outline-success btn-sm">
                                    Log In
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}
