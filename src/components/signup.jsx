import React from "react";
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { postUser } from "../App/features/usersSlice";
import { createNote } from "../App/features/noteSlice";

const SignUp = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const initialData = {
        username: "",
        firstName: "",
        lastName: "",
        password: "",
        birthYear: "",
        email: "",
        gender: ""
    }

    const [data, setData] = useState(initialData)

    const handleChange = (e) => {
        const { id, value } = e.target;
        setData((prev) => ({
            ...prev,
            [id]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(postUser(data))
                .then(function (response) {
                    if (response.error) {
                        dispatch(createNote(["Error creating user", "fail"]));
                    } else {
                        setData(initialData);
                        dispatch(createNote(["User registered successfully!!", "success"]));
                        console.log(data)
                        navigate("/login");
                    }

                })
                .catch(function (err) {
                    dispatch(createNote([err.message, "fail"]));
                })
        }
        catch (err) {
            dispatch(createNote([err.message, "fail"]));
        }
    }


    // List of required fields
    const requiredFields = ["firstName", "lastName", "username", "password", "email"];

    // Check if all required fields are filled
    // const isFormValid = requiredFields.every(field => data[field].trim() !== "");

    // Helper to check if a field is missing
    const isFieldMissing = (field) => data[field].trim() === "";

    // Helper to check if password is valid
    const isPasswordValid = data.password.length >= 8;

    // Update form validity to include password length check
    const isFormValid = requiredFields.every(field => data[field].trim() !== "") && isPasswordValid;

    // Track if form was submitted
    const [submitted, setSubmitted] = useState(false);

    return (
        <>
            <h1 className="center-align blue-text text-darken-3" style={{ marginTop: "40px" }}>Register</h1>
            <div className="row" style={{ marginTop: "30px", display: "flex", justifyContent: "center", alignItems: "center", minHeight: "70vh" }}>
                <form
                    className="col s12 z-depth-2 white"
                    style={{
                        padding: "32px",
                        borderRadius: "12px",
                        width: "50vw",
                        minWidth: "320px",
                        maxWidth: "600px",
                        margin: "0 auto"
                    }}
                    onSubmit={(e) => {
                        setSubmitted(true);
                        handleSubmit(e);
                    }}
                >
                    <div className="row">
                        <div className="input-field col s12 m6">
                            <input
                                placeholder="First name"
                                id="firstName"
                                type="text"
                                className={`validate ${submitted && isFieldMissing("firstName") ? "invalid" : ""}`}
                                onChange={handleChange}
                                value={data.firstName}
                                required
                            />
                            <span className={`helper-text${submitted && isFieldMissing("firstName") ? " red-text" : ""}`}>
                                Required
                            </span>
                        </div>
                        <div className="input-field col s12 m6">
                            <input
                                placeholder="Last name"
                                id="lastName"
                                type="text"
                                className={`validate ${submitted && isFieldMissing("lastName") ? "invalid" : ""}`}
                                onChange={handleChange}
                                value={data.lastName}
                                required
                            />
                            <span className={`helper-text${submitted && isFieldMissing("lastName") ? " red-text" : ""}`}>
                                Required
                            </span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12 m6">
                            <select
                                id="gender"
                                className="browser-default"
                                onChange={handleChange}
                                value={data.gender}
                                style={{
                                    color: data.gender === "" ? "#9e9e9e" : "#000",
                                    border: "none",
                                    borderBottom: "1px solid #9e9e9e",
                                    borderRadius: 0,
                                    boxShadow: "none",
                                    background: "transparent",
                                    paddingLeft: 0,
                                    paddingRight: 0,
                                    paddingTop: "16px",
                                    paddingBottom: "8px",
                                    height: "3rem"
                                }}
                            >
                                <option value="" disabled hidden style={{ color: "#9e9e9e" }}>
                                    Gender
                                </option>
                                <option value="male" style={{ color: "#000" }}>Male</option>
                                <option value="female" style={{ color: "#000" }}>Female</option>
                            </select>
                        </div>
                        <div className="input-field col s12 m6">
                            <input
                                placeholder="Year of birth"
                                id="birthYear"
                                type="text"
                                className="validate"
                                onChange={handleChange}
                                value={data.birthYear}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input
                                placeholder="Example@something.com"
                                id="email"
                                type="email"
                                className={`validate ${submitted && isFieldMissing("email") ? "invalid" : ""}`}
                                onChange={handleChange}
                                value={data.email}
                                required
                            />
                            <span className={`helper-text${submitted && isFieldMissing("email") ? " red-text" : ""}`}>
                                Required
                            </span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input
                                placeholder="Username"
                                id="username"
                                type="text"
                                className={`validate ${submitted && isFieldMissing("username") ? "invalid" : ""}`}
                                onChange={handleChange}
                                value={data.username}
                                required
                            />
                            <span className={`helper-text${submitted && isFieldMissing("username") ? " red-text" : ""}`}>
                                Required
                            </span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input
                                placeholder="Password"
                                id="password"
                                type="password"
                                className={`validate ${submitted && (isFieldMissing("password") || !isPasswordValid) ? "invalid" : ""}`}
                                onChange={handleChange}
                                value={data.password}
                                required
                            />
                            <span className={`helper-text${submitted && isFieldMissing("password") ? " red-text" : ""}`}>
                                Required
                            </span>
                            {submitted && !isFieldMissing("password") && !isPasswordValid && (
                                <span className="helper-text red-text">Password must be at least 8 characters</span>
                            )}
                        </div>
                    </div>
                    <div className="row" style={{ marginTop: "24px" }}>
                        <div className="col s12 center-align">
                            <button
                                type="submit"
                                className="waves-effect waves-light blue darken-3 btn-small z-depth-5"
                                style={{ marginRight: "16px" }}
                                disabled={!isFormValid}
                            >
                                Submit
                            </button>
                            <span style={{ fontSize: "1.1rem" }}>
                                Already have an account? <Link className="blue-text text-darken-2" to="/login">Log In</Link>
                            </span>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )

}

export default SignUp;