import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const User = (props)=>{

    return(
        <>
           <div className="card" style={{width: "18rem"}}>
                <div className="card-body">
                    <h5 className="card-title">{props.username}</h5>
                    <p className="card-text">{props.id}</p>
                    <button className="btn btn-outline-danger" onClick={()=>{props.handleDelete(props.id)}}>X</button>
                </div>
            </div>
        </>
    )
}

export default User;


