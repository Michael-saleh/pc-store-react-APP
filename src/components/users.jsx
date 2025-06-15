import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getUsers, deleteUser } from "../App/features/usersSlice";
import { createNote } from "../App/features/noteSlice"

const Users = () => {

    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.users.currentUser);
    const status = useSelector((state) => state.users.status);
    const error = useSelector((state) => state.users.error);
    const users = useSelector((state) => state.users.data);

    const handleDelete = async (id) => {
        if (currentUser && (currentUser._id == id || currentUser.isAdmin == true)) {
            await dispatch(deleteUser(id));
            dispatch(createNote(["user deleted successfully", "success"]));
            dispatch(getUsers());
        } else {
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
                                onClick={() => { handleDelete(user._id) }}
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
