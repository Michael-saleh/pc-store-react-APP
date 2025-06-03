import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

const Navbar = (props) => {

    const navigate = useNavigate();
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
                <Link to="/" className="brand-logo px-3">PC store</Link>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><Link to="/users">Users</Link></li>
                    <li><Link to="/products">Products</Link></li>
                    <li><Link to="/orders">Orders</Link></li>
                    <li>{props.currentUser ? <Link onClick={handleLogout}>Log out</Link> : <Link to="/login">Login</Link>}</li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;