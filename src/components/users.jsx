import React, {useState, useEffect} from 'react';
import User from './user'
import axios from 'axios';

const Users = ()=>{

    const [users, setUsers] = useState([]);
    const handleDelete = (id) => {
        axios.delete(`http://localhost:3000/users/${id}`)
            .then(function(response){
                // Remove the deleted user from the state
                console.log(response.data);
                if(response.data !== "Not authorized"){
                    setUsers(prevUsers => prevUsers.filter(user => user._id !== id));
                } else{
                    alert("Not Authorized")
                }
                
            })
            .catch(function(error){
                console.log(error.message);
                alert(error.message);
            });
    };
        
    
    useEffect(()=>{
        axios.get('http://localhost:3000/users')
        .then(function (response) {
            setUsers(response.data);
        })
        .catch(function (error) {
            console.log(error.message);
            alert(error.message)
        });
        
        
    },[])

    return(
        <>
            {users.map(user => {
                return <User username={user.username} id={user._id} key={user._id} handleDelete={handleDelete} />
            })}
        </>
    )
}

export default Users;
