import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = (props) => {
    const navigate = useNavigate();
    const [data, setData] = useState({ username: "", password: "" });
    const [loginError, setLoginError] = useState(false);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setData((prev) => ({
            ...prev,
            [id]: value
        }));
        setLoginError(false);
    };

    // Update handleSubmit to set loginError
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            axios.post('http://localhost:3000/users/login', { username: data.username, password: data.password })
                .then(function (response) {
                    if (response.data._id) {
                        props.setCurrentUser(response.data)
                        props.createNote(`${response.data.username} logged in successfully`, "success");
                        navigate('/users')
                    } else {
                        props.createNote("Invalid username or password", "fail");
                        setLoginError(true);
                    }
                })
                .catch(function (error) {
                    props.createNote(error.message, "fail");
                    setLoginError(true);
                })
        }
        catch (error) {
            props.createNote(error.message, "fail");
            setLoginError(true);
        };
    }

    return (
        <>
            <div className="row" style={{ marginTop: "30px", display: "flex", justifyContent: "center", alignItems: "center", minHeight: "50vh" }}>
                <h1 className="center-align  blue-text text-darken-3" style={{ marginTop: "40px" }}>Login</h1>
                <form
                    className="col s12 z-depth-2 white"
                    style={{
                        padding: "32px",
                        borderRadius: "12px",
                        width: "50vw",
                        minWidth: "320px",
                        maxWidth: "600px",
                        margin: "0 auto",
                        maxWidth: "300px"
                    }}
                    onSubmit={handleSubmit}
                >
                    <div className="row">
                        <div className="input-field col s12" style={loginError ? { position: "relative" } : {}}>
                            <input
                                placeholder="Username"
                                id="username"
                                type="text"
                                className={`validate ${loginError ? "invalid" : ""}`}
                                onChange={handleChange}
                                value={data.username}
                                style={loginError ? { borderColor: "red" } : {}}
                            />
                            {loginError && (
                                <span style={{
                                    color: "red",
                                    position: "absolute",
                                    right: "10px",
                                    top: "10px",
                                    fontWeight: "bold",
                                    fontSize: "1.2rem"
                                }}>!</span>
                            )}
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12" style={loginError ? { position: "relative" } : {}}>
                            <input
                                placeholder="Password"
                                id="password"
                                type="password"
                                className={`validate ${loginError ? "invalid" : ""}`}
                                onChange={handleChange}
                                value={data.password}
                                style={loginError ? { borderColor: "red" } : {}}
                            />
                            {loginError && (
                                <span style={{
                                    color: "red",
                                    position: "absolute",
                                    right: "10px",
                                    top: "10px",
                                    fontWeight: "bold",
                                    fontSize: "1.2rem"
                                }}>!</span>
                            )}
                        </div>
                    </div>
                    <div className="row" style={{ marginTop: "24px" }}>
                        <div className="col s12 center-align">
                            <button type="submit" className="waves-effect waves-light blue darken-3 btn-small z-depth-5" style={{ marginRight: "16px" }} disabled={!data.username || data.password.length < 8}>
                                Login
                            </button>
                            <div style={{ fontSize: "1.1rem" }}>
                                Don't have an account? <Link className="blue-text text-darken-2" to="/signup">Register</Link>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Login;