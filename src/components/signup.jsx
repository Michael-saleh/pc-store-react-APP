import React from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

const SignUp = () => {

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
            axios.post("http://localhost:3000/users", data)
                .then(function (response) {
                    setData(initialData);
                    alert("User registered successfully!!")
                })
                .catch(function (err) {
                    console.log(err.message)
                })
        }
        catch (err) {
            console.log(err.message)
        }
    }


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
                    onSubmit={handleSubmit}
                >
                    <div className="row">
                        <div className="input-field col s12 m6">
                            <input placeholder="First name" id="firstName" type="text" className="validate" onChange={handleChange} value={data.firstName} />
                        </div>
                        <div className="input-field col s12 m6">
                            <input placeholder="Last name" id="lastName" type="text" className="validate" onChange={handleChange} value={data.lastName} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12 m6">
                            <input placeholder="Gender" id="gender" type="text" className="validate" onChange={handleChange} value={data.gender} />
                        </div>
                        <div className="input-field col s12 m6">
                            <input placeholder="Year of birth" id="birthYear" type="text" className="validate" onChange={handleChange} value={data.birthYear} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input placeholder="Example@something.com" id="email" type="email" className="validate" onChange={handleChange} value={data.email} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input placeholder="Username" id="username" type="text" className="validate" onChange={handleChange} value={data.username} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input placeholder="Password" id="password" type="password" className="validate" onChange={handleChange} value={data.password} />
                        </div>
                    </div>
                    <div className="row" style={{ marginTop: "24px" }}>
                        <div className="col s12 center-align">
                            <button type="submit" className="waves-effect waves-light blue darken-3 btn-small z-depth-5" style={{ marginRight: "16px" }}>
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