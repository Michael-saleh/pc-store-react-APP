import { useEffect } from 'react';
import { Routes, Route } from 'react-router';
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { logoutUser } from "./app/features/usersSlice";
import { createNote } from "./app/features/noteSlice";
import { jwtDecode } from "jwt-decode";
import Login from './components/login';
import Users from './components/users';
import Signup from './components/signup';
import Navbar from "./components/navBar";
import Note from "./components/note";
import Home from "./components/home";
import Products from "./components/products";
import AddProduct from "./components/addProduct";
import UserProfile from "./components/userProfile";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';



function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.users.currentUser);
  const token = localStorage.getItem('token');

  // Check if a token exists and valid, else reset currentUser and token.
  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        dispatch(logoutUser())
      }
    }

  }, [])

  // If none admin user try to access Users page, redirects to login page.
  useEffect(() => {
    if (!(currentUser && currentUser.isAdmin) && (location.pathname === '/users' || location.pathname === '/products/add')) {
      dispatch(createNote(["Login as admin to access this page", "fail"]));
    }
  }, [location.pathname]);


  return (
    <>

      <Navbar />
      <Note />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/add" element={(currentUser && currentUser.isAdmin) ? (<AddProduct />) : (<Login />)} />
        <Route path="/userProfile" element={<UserProfile />} />
        <Route path="/users" element={(currentUser && currentUser.isAdmin) ? (<Users />) : (<Login />)} />
      </Routes>
    </>
  )
}

export default App;
