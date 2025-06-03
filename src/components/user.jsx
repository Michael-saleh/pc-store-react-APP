import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const User = (props) => {

    return (
        <>
            <div className="card blue darken-3" style={{ maxWidth: "300px" }}>

                <div className="card-content white-text">
                    <span className="card-title">{props.username}</span>
                    <p>First Name : {props.firstName}</p>
                    <p>Last Name : {props.lastName}</p>
                    <p>Birth Year : {props.birthYear}</p>
                    <p>Gender : {props.gender}</p>
                    <p>Email : {props.email}</p>
                </div>
                <div className="card-action">
                    <button
                        className="btn red lighten-1 waves-effect waves-light"
                        onClick={() => { props.handleDelete(props.id) }}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </>
    )
}

export default User;



