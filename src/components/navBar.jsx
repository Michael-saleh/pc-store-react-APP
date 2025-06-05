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
        <nav className="blue darken-3">
            <div className="nav-wrapper">
                <Link to="/" className="brand-logo px-3" style={{ textDecoration: "none" }}>PC store</Link>
                <a href="#" data-target="mobile-demo" className="sidenav-trigger">
                    <i className="material-icons">menu</i>
                </a>
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
                            <Link to="/login" className="modern-link" style={{ textDecoration: "none" }}>Login</Link>
                        )}
                    </li>
                </ul>
                <ul className="sidenav" id="mobile-demo">
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
                            <Link to="/login" className="modern-link" style={{ textDecoration: "none" }}>Login</Link>
                        )}
                    </li>
                </ul>
            </div>
        </nav>
    )
}
/*
    To move the "PC store" brand logo into the menu for mobile, 
    you can add it as the first <li> in the sidenav and remove it from the nav bar.
    Also, for desktop, you can keep it as is.
    To do this, you can use CSS classes to hide/show the logo appropriately.
*/

// Add this CSS somewhere in your styles (e.g., App.css):
// .hide-on-med-and-up { display: none !important; }
// @media (max-width: 992px) {
//   .hide-on-med-and-up { display: block !important; }
//   .hide-on-med-and-down { display: none !important; }
// }

export default Navbar;