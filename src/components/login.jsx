import React, { useState, useEffect } from "react";
import axios from "axios";

const Login = function (props) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            axios.post('http://localhost:3000/users/login', {username: username, password: password})
                .then(function(response){
                    props.setCurrentUser(response.data)
                    alert(`${response.data.username} logged in successfully`)
                })
                .catch(function(error){
                    alert(error.message)
                })
                
        }
        
        catch(error){
            console.log(props)
            alert(error.message)
        };
    }

    return (
        <>
            <div className="modal modal-sheet position-static d-block bg-body-secondary p-4 py-md-5" tabIndex="-1" role="dialog" id="modalSignin">
                <div className="modal-dialog">
                    <div className="modal-content rounded-4 shadow">
                        <div className="modal-header p-5 pb-4 border-bottom-0">
                            <h1 className="fw-bold mb-0 fs-2">Log in</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body p-5 pt-0">
                            <form className="" onSubmit={handleSubmit}>
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control rounded-3" id="floatingInput" placeholder="name@example.com" value={username} onChange={(e) => { setUsername(e.target.value) }} />
                                    <label htmlFor="floatingInput">Email address</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="password" className="form-control rounded-3" id="floatingPassword" placeholder="Password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                                    <label htmlFor="floatingPassword">Password</label>
                                </div>
                                <button className="w-100 mb-2 btn btn-lg rounded-3 btn-primary" type="submit">Log in</button>

                                {/*<small className="text-body-secondary">By clicking Sign up, you agree to the terms of use.</small>
                                <hr className="my-4" />
                                <h2 className="fs-5 fw-bold mb-3">Or use a third-party</h2>
                                <button className="w-100 py-2 mb-2 btn btn-outline-secondary rounded-3" type="submit">
                                    <svg className="bi me-1" width="16" height="16" aria-hidden="true"><use xlinkHref="#google"></use></svg>
                                        Sign up with Google
                                </button>
                                <button className="w-100 py-2 mb-2 btn btn-outline-primary rounded-3" type="submit">
                                    <svg className="bi me-1" width="16" height="16" aria-hidden="true"><use xlinkHref="#facebook"></use></svg>
                                        Sign up with Facebook
                                </button>
                                <button className="w-100 py-2 mb-2 btn btn-outline-secondary rounded-3" type="submit">
                                    <svg className="bi me-1" width="16" height="16" aria-hidden="true"><use xlinkHref="#github"></use></svg>
                                        Sign up with GitHub
                                </button> */}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default Login;