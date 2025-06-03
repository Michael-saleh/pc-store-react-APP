import React, { useState, useEffect } from 'react';
import User from './user'
import axios from 'axios';

const Users = (props) => {

    const [users, setUsers] = useState([]);
    const handleDelete = (id) => {
        axios.delete(`http://localhost:3000/users/${id}`)
            .then(function (response) {
                // Remove the deleted user from the state
                if (response.data !== "Not authorized") {
                    if (props.currentUser._id === response.data._id) {
                        props.setCurrentUser(null);
                    }
                    setUsers(prevUsers => prevUsers.filter(user => user._id !== id));

                } else {
                    props.createNote("Not Authorized", "fail")
                }

            })
            .catch(function (error) {
                console.log(error.message);
                alert(error.message);
            });
    };


    useEffect(() => {
        axios.get('http://localhost:3000/users')
            .then(function (response) {
                setUsers(response.data);
            })
            .catch(function (error) {
                console.log(error.message);
                alert(error.message)
            });


    }, [])

    return (
        <>
            {users.map(user => {
                return <User username={user.username} id={user._id} key={user._id} firstName={user.firstName} lastName={user.lastName} gender={user.gender} birthYear={user.birthYear} email={user.email} handleDelete={handleDelete} />
            })}
        </>
    )
}

export default Users;
