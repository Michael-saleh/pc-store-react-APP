import { useState, useEffect } from 'react';
import axios from "axios";
import './App.css';
import './index.css';
import Login from './components/login';
import Users from './components/users';
import Logout from './components/logout';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';



function App() {
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(()=>{
    axios.get("http://localhost:3000/users/currentUser")
      .then(function(response){
        setCurrentUser(response.data)
      })
      .catch(function(error){
        console.log(error)
      })
  },[])
  

  return (
    <>
      {currentUser ? <Logout setCurrentUser={setCurrentUser} /> : <Login currentUser={currentUser} setCurrentUser={setCurrentUser} />}
      
      <Users currentUser={currentUser} />
    </>
  )
}

export default App;
