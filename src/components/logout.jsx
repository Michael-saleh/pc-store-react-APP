import React from "react";
import axios from "axios";

const Logout = (props)=>{

    const handleLogout = ()=>{
        axios.post("http://localhost:3000/users/logout")
            .then(function(response){
                console.log(response)
                props.setCurrentUser(null)
            })
            .catch(function(error){
                console.log(error.message)
            })
    }

    return (
        <>
            <button className="btn btn-outline-warning" onClick={()=>handleLogout()}>Log Out</button>
        </>
    )

}

export default Logout;