import { useState, useEffect } from 'react';
import axios from "axios";
import { BrowserRouter, Routes, Route } from 'react-router';
import './App.css';
import './index.css';
import Login from './components/login';
import Users from './components/users';
import Signup from './components/signup';
import Navbar from "./components/navBar";
import Note from "./components/note";
import Home from "./components/home";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';



function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [note, setNote] = useState([]);

  const createNote = (message, condition) => {
    setNote([message, condition]);
    setTimeout(() => {
      setNote([])
    }, 3000)
  }

  const removeNote = () => {
    setNote([]);
  };



  useEffect(() => {
    axios.get("http://localhost:3000/users/currentUser")
      .then(function (response) {
        setCurrentUser(response.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  }, [])


  return (
    <>
      <BrowserRouter>
        <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} createNote={createNote} />
        <Note createNote={createNote} removeNote={removeNote} note={note} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login currentUser={currentUser} setCurrentUser={setCurrentUser} createNote={createNote} />} />
          <Route path="/signup" element={<Signup />} createNote={createNote} />
          <Route path="/users" element={<Users currentUser={currentUser} setCurrentUser={setCurrentUser} createNote={createNote} />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;

