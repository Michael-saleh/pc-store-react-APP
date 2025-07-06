import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteUser, logoutUser, editUser } from "../app/features/usersSlice";
import { createNote } from "../app/features/noteSlice";
import userProfileImg from '../assets/images/user-profile.png';
import { useState } from "react";

const UserProfile = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        birthYear: currentUser.birthYear,
        gender: currentUser.gender
    });

    const handleEdit = async () => {
        // Add state to manage edit mode and form values
        if (!isEditing) {
            setIsEditing(true);
            setFormData({
                firstName: currentUser.firstName,
                lastName: currentUser.lastName,
                birthYear: currentUser.birthYear,
                gender: currentUser.gender
            });
            return;
        }
    };

    const handleSave = async () => {
        try {
            // Pass id and data as separate arguments
            const resultAction = await dispatch(editUser({ id: currentUser.id, updates: formData }));
            if (editUser.fulfilled.match(resultAction)) {
                const updatedUser = { ...currentUser, ...formData };
                localStorage.setItem("currentUser", JSON.stringify(updatedUser));
                dispatch(createNote(["Profile updated successfully", "success"]));
                setIsEditing(false);
            } else {
                dispatch(createNote(["Profile update failed 1", "fail"]));
            }
        } catch (error) {
            dispatch(createNote(["Profile update failed 2", "fail"]));
        }
    };

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
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '90vh',
            width: '100vw',
            position: 'relative'
        }}>
            {currentUser && (
                <div className="user-profile-wrapper" style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    position: 'relative'
                }}>
                    <div className="user-profile-card" style={{
                        background: '#fff',
                        borderRadius: 16,
                        boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
                        padding: 32,
                        maxWidth: 400,
                        width: '100%',
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        position: 'relative'
                    }}>
                        {/* Edit button at top right of card */}
                        <button
                            onClick={() => { handleEdit() }}
                            style={{
                                position: 'absolute',
                                top: 16,
                                right: 16,
                                background: 'transparent',
                                border: 'none',
                                cursor: 'pointer',
                                fontSize: 24,
                                color: '#009688',
                                zIndex: 2
                            }}
                            aria-label="Edit Profile"
                            title="Edit Profile"
                        >
                            &#9998;
                        </button>
                        <img
                            src={userProfileImg}
                            alt="User"
                            style={{
                                width: 100,
                                height: 100,
                                borderRadius: '50%',
                                objectFit: 'cover',
                                border: '3px solid #009688',
                                marginBottom: 24
                            }}
                        />
                        <h3 style={{ color: '#009688', marginBottom: 8 }}>{currentUser.username}</h3>
                        <p style={{ color: '#757575', marginBottom: 24 }}>{currentUser.email}</p>
                        <div style={{
                            textAlign: 'center',
                            marginBottom: 24,
                            width: '100%'
                        }}>
                            <div style={{
                                display: 'flex',
                                gap: 16,
                                marginBottom: 8,
                                justifyContent: 'center'
                            }}>

                                {!isEditing ?
                                    <>
                                        <div>
                                            <strong>First name:</strong> <span>{currentUser.firstName}</span>
                                        </div>
                                        <div>
                                            <strong>Last name:</strong> <span>{currentUser.lastName}</span>
                                        </div>
                                    </> :
                                    <>
                                        <div>
                                            <strong>First name:</strong>
                                            <input
                                                type="text"
                                                value={formData.firstName}
                                                onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                                                style={{ marginLeft: 8 }}
                                            />
                                        </div>
                                        <div>
                                            <strong>Last name:</strong>
                                            <input
                                                type="text"
                                                value={formData.lastName}
                                                onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                                                style={{ marginLeft: 8 }}
                                            />
                                        </div>
                                    </>
                                }

                            </div>
                            <div style={{
                                display: 'flex',
                                gap: 16,
                                marginBottom: 8,
                                justifyContent: 'center'
                            }}>

                                {!isEditing ?
                                    <>
                                        <div>
                                            <strong>Gender:</strong> <span>{currentUser.gender}</span>
                                        </div>
                                        <div>
                                            <strong>Year of birth:</strong> <span>{currentUser.birthYear}</span>
                                        </div>
                                    </> :
                                    <>
                                        <div>
                                            <strong>Gender:</strong>
                                            <select
                                                id="gender"
                                                value={formData.gender}
                                                onChange={e => setFormData({ ...formData, gender: e.target.value })}
                                                style={{ marginLeft: 8 }}
                                            >
                                                <option value="">Select</option>
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                                <option value="other">Other</option>
                                            </select>
                                        </div>
                                        <div>
                                            <strong>Year of birth:</strong>
                                            <input
                                                type="number"
                                                value={formData.birthYear}
                                                onChange={e => setFormData({ ...formData, birthYear: e.target.value })}
                                                style={{ marginLeft: 8 }}
                                            />
                                        </div>
                                    </>
                                }

                            </div>
                        </div>
                        {!isEditing ?
                            <button
                                className="btn"
                                style={{
                                    background: '#e53935',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: 4,
                                    padding: '10px 24px',
                                    cursor: 'pointer',
                                    fontWeight: 600
                                }}
                                onClick={() => handleDelete(currentUser.id)}
                            >
                                Delete Account
                            </button> :

                            <>
                                <button
                                    className="btn"
                                    style={{
                                        background: '#009688',
                                        color: '#fff',
                                        border: 'none',
                                        borderRadius: 4,
                                        padding: '10px 24px',
                                        cursor: 'pointer',
                                        fontWeight: 600,
                                        marginTop: 16
                                    }}
                                    onClick={() => { handleSave() }}
                                >
                                    Save Changes
                                </button>
                                <button
                                    style={{
                                        background: '#757575',
                                        color: '#fff',
                                        border: 'none',
                                        borderRadius: 4,
                                        padding: '10px 24px',
                                        cursor: 'pointer',
                                        fontWeight: 600,
                                        marginTop: 16,
                                        marginLeft: 8
                                    }}
                                    onClick={() => setIsEditing(false)}
                                >
                                    Cancel
                                </button>
                            </>
                        }

                    </div>
                </div>
            )}
        </div>
    );
}

export default UserProfile;