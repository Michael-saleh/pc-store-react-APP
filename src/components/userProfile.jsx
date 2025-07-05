import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteUser, logoutUser } from "../app/features/usersSlice";
import { createNote } from "../app/features/noteSlice";

const UserProfile = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));



    const handleDelete = async (id) => {
        if (confirm("Are you sure you want to delete your account?")) {
            try {
                const resultAction = await dispatch(deleteUser(id));
                if (deleteUser.fulfilled.match(resultAction)) {
                    dispatch(createNote(["user deleted successfully", "success"]));
                    dispatch(logoutUser());
                    navigate('/login');
                } else {
                    dispatch(createNote(["user delete failed, action not authorized", "fail"]));
                }
            } catch (error) {
                dispatch(createNote(["user delete failed, action not authorized", "fail"]));
            }
        }


    };

    return (
        <>
            {currentUser &&

                <div>
                    <h1>{currentUser.username}</h1>
                    <button className="btn red lighten-1 waves-effect waves-light" onClick={() => { handleDelete(currentUser.id) }}>Delete account</button>
                </div>
            }
        </>
    )
}

export default UserProfile;