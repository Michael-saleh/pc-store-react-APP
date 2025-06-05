import React, { useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

const Navbar = (props) => {

    const navigate = useNavigate();

    useEffect(() => {
        // Initialize Materialize sidenav
        const elems = document.querySelectorAll('.sidenav');
        if (window.M && elems.length > 0) {
            window.M.Sidenav.init(elems);
        }
    }, []);

    const handleLogout = () => {
        try {
            axios.post("http://localhost:3000/users/logout")
                .then(function (response) {
                    props.setCurrentUser(null)
                    navigate('/login')
                    props.createNote("Logged out successfully", "success");
                })
                .catch(function (error) {
                    console.log(error.message)
                    props.createNote("error logging out", "fail");
                })
        }
        catch (err) {
            console.log(err.message);
            props.createNote("error logging out", "fail");
        }
    }

    return (
        <div className="navbar-fixed">
            <nav className="blue darken-3">
                <div className="nav-wrapper">
                    <Link to="/" className="brand-logo px-3" style={{ textDecoration: "none" }}>PC store</Link>
                    <Link to="#" data-target="mobile-demo" className="sidenav-trigger">
                        <i className="material-icons">Menu</i>
                    </Link>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li>
                            <Link to="/users" className="modern-link" style={{ textDecoration: "none" }}>Users</Link>
                        </li>
                        <li>
                            <Link to="/products" className="modern-link" style={{ textDecoration: "none" }}>Products</Link>
                        </li>
                        <li>
                            <Link to="/orders" className="modern-link" style={{ textDecoration: "none" }}>Orders</Link>
                        </li>
                        <li>
                            {props.currentUser ? (
                                <Link onClick={handleLogout} className="modern-link" style={{ textDecoration: "none" }}>Log out</Link>
                            ) : (
                                <span className="modern-link" style={{ textDecoration: "none", display: "flex" }}><Link to="/login">Login</Link><span>/</span><Link to="/signup">signup</Link></span>
                            )}
                        </li>
                    </ul>
                    <ul className="sidenav" id="mobile-demo">
                        <li>
                            <Link to="/" className="modern-link" style={{ textDecoration: "none" }}>Home</Link>
                        </li>
                        <hr style={{ width: "40%", color: "black" }} />
                        <li>
                            <Link to="/users" className="modern-link" style={{ textDecoration: "none" }}>Users</Link>
                        </li>
                        <li>
                            <Link to="/products" className="modern-link" style={{ textDecoration: "none" }}>Products</Link>
                        </li>
                        <li>
                            <Link to="/orders" className="modern-link" style={{ textDecoration: "none" }}>Orders</Link>
                        </li>
                        <li>
                            {props.currentUser ? (
                                <Link onClick={handleLogout} className="modern-link" style={{ textDecoration: "none" }}>Log out</Link>
                            ) : (
                                <>
                                    <Link to="/login" className="modern-link" style={{ textDecoration: "none" }}>Login</Link>
                                    <Link to="/signup" className="modern-link" style={{ textDecoration: "none" }}>signup</Link>
                                </>
                            )}
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}



export default Navbar;