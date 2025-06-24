import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUsers, deleteUser, logoutUser } from "../app/features/usersSlice";
import { createNote } from "../app/features/noteSlice"

const Users = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const status = useSelector((state) => state.users.status);
    const error = useSelector((state) => state.users.error);
    const users = useSelector((state) => state.users.data);

    const handleDelete = async (id) => {
        try {
            const resultAction = await dispatch(deleteUser(id));
            if (deleteUser.fulfilled.match(resultAction)) {
                dispatch(createNote(["user deleted successfully", "success"]));
                dispatch(getUsers());
                if (currentUser.id == id) {
                    dispatch(logoutUser());
                    navigate('/login');
                }
            } else {
                dispatch(createNote(["user delete failed, action not authorized", "fail"]));
            }
        } catch (error) {
            dispatch(createNote(["user delete failed, action not authorized", "fail"]));
        }

    };

    useEffect(() => {
        dispatch(getUsers());
    }, []);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(getUsers());
        }
    }, [status, dispatch]);

    return (
        <>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {users.map(user => {
                return (
                    <div
                        key={user._id}
                        className={user.isAdmin ? "card yellow darken-2" : "card blue darken-3"}
                        style={{ maxWidth: "300px" }}
                    >
                        <div className={`card-content ${user.isAdmin ? "black-text text-darken-3" : "white-text"}`}>
                            <span className="card-title" style={{ fontWeight: "bold" }}>{user.username}</span>
                            <p>First Name : {user.firstName}</p>
                            <p>Last Name : {user.lastName}</p>
                            <p>Birth Year : {user.birthYear}</p>
                            <p>Gender : {user.gender}</p>
                            <p>Email : {user.email}</p>
                        </div>
                        <div className="card-action">
                            <button
                                className="btn red lighten-1 waves-effect waves-light"
                                onClick={() => { confirm(`Are you sure you want to detele ${user.username}?`) && handleDelete(user._id) }}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                )
            })}
        </>
    )
}

export default Users;
