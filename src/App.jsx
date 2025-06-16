import { useEffect } from 'react';
import { Routes, Route } from 'react-router';
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { createNote } from "./app/features/noteSlice";
/* import './App.css';
import './index.css'; */
import Login from './components/login';
import Users from './components/users';
import Signup from './components/signup';
import Navbar from "./components/navBar";
import Note from "./components/note";
import Home from "./components/home";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';



function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.users.currentUser);




  useEffect(() => {
    if (!(currentUser && currentUser.isAdmin) && location.pathname === '/users') {
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
        <Route path="/users" element={(currentUser && currentUser.isAdmin) ? (<Users />) : (<Login />)} />
      </Routes>
    </>
  )
}

export default App;
