import React, { useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../app/features/usersSlice";
import { createNote } from "../app/features/noteSlice";

const Navbar = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.users.currentUser)

    useEffect(() => {
        // Initialize Materialize sidenav
        const elems = document.querySelectorAll('.sidenav');
        if (window.M && elems.length > 0) {
            window.M.Sidenav.init(elems);
        }
    }, []);

    // closes sidenav when a button is clicked, or when clicking outside of it
    const closeSidenav = () => {
        const sidenav = document.querySelector('.sidenav');
        if (window.M && sidenav) {
            const instance = window.M.Sidenav.getInstance(sidenav);
            if (instance) instance.close();
        }
    };

    const handleLogout = async () => {
        try {
            await dispatch(logoutUser()); // Wait for logout to complete
            closeSidenav();
            navigate('/login'); // Navigate to the login page after logout
            dispatch(createNote(["Logged out successfully", "success"]));
        } catch (err) {
            console.log(err.message);
            dispatch(createNote(["error logging out", "fail"]));
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
                        {(currentUser) && <li>
                            <Link to="/users" className="modern-link" style={{ textDecoration: "none" }}>Users</Link>
                        </li>}

                        <li>
                            <Link to="/products" className="modern-link" style={{ textDecoration: "none" }}>Products</Link>
                        </li>
                        <li>
                            <Link to="/orders" className="modern-link" style={{ textDecoration: "none" }}>Orders</Link>
                        </li>
                        <li>
                            {currentUser ? (
                                <Link onClick={() => handleLogout()} className="modern-link" style={{ textDecoration: "none" }}>Log out</Link>
                            ) : (
                                <span className="modern-link" style={{ textDecoration: "none", display: "flex" }}><Link to="/login">Login</Link><span>/</span><Link to="/signup">signup</Link></span>
                            )}
                        </li>
                    </ul>
                    <ul className="sidenav" id="mobile-demo">
                        <li>
                            <Link to="/" className="modern-link" style={{ textDecoration: "none" }} onClick={closeSidenav}>Home</Link>
                        </li>
                        <hr style={{ width: "40%", color: "black" }} />
                        {currentUser && currentUser.isAdmin && <li>
                            <Link to="/users" className="modern-link" style={{ textDecoration: "none" }} onClick={closeSidenav}>Users</Link>
                        </li>}
                        <li>
                            <Link to="/products" className="modern-link" style={{ textDecoration: "none" }} onClick={closeSidenav}>Products</Link>
                        </li>
                        <li>
                            <Link to="/orders" className="modern-link" style={{ textDecoration: "none" }} onClick={closeSidenav}>Orders</Link>
                        </li>
                        <li>
                            {currentUser ? (
                                <Link onClick={handleLogout} className="modern-link" style={{ textDecoration: "none" }}>Log out</Link>
                            ) : (
                                <>
                                    <Link to="/login" className="modern-link" style={{ textDecoration: "none" }} onClick={closeSidenav}>Login</Link>
                                    <Link to="/signup" className="modern-link" style={{ textDecoration: "none" }} onClick={closeSidenav}>signup</Link>
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