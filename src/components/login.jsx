import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginUser, resetError } from "../App/features/usersSlice";
import { createNote } from "../App/features/noteSlice";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [data, setData] = useState({ username: "", password: "" });
    const { status, error } = useSelector(state => state.users);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setData((prev) => ({ ...prev, [id]: value }));
        error && dispatch(resetError());
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(loginUser(data))
                .then(function (response) {
                    if (response.error) {
                        dispatch(createNote([response.payload, "fail"]))
                    } else {
                        dispatch(createNote([`logged in as ${response.payload.user.username}`, "success"]))
                        navigate("/")
                    }

                })
                .catch(function (error) {
                    dispatch(createNote(["error logging in", "fail"]))
                })
        }
        catch (error) {
            dispatch(createNote([error.message, "fail"]))
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
                        minWidth: "380px",
                        maxWidth: "500px",
                        margin: "0 auto"
                    }}
                    onSubmit={handleSubmit}
                >
                    {status === 'logging in' && <p>Logging in...</p>}
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <div className="row">
                        <div className="input-field col s12" style={error ? { position: "relative" } : {}}>
                            <input
                                placeholder="Username"
                                id="username"
                                type="text"
                                className={`validate ${error ? "invalid" : ""}`}
                                onChange={handleChange}
                                value={data.username}
                                style={error ? { borderColor: "red" } : {}}
                            />
                            {error && (
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
                        <div className="input-field col s12" style={error ? { position: "relative" } : {}}>
                            <input
                                placeholder="Password"
                                id="password"
                                type="password"
                                className={`validate ${error ? "invalid" : ""}`}
                                onChange={handleChange}
                                value={data.password}
                                style={error ? { borderColor: "red" } : {}}
                            />
                            {error && (
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