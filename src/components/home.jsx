import React, { useState } from "react";
import { useSelector } from "react-redux";


const Home = () => {
    const currentUser = useSelector((state) => state.users.currentUser);
    const token = useSelector((state) => state.users.token);

    return (
        <div className="container center-align" style={{ marginTop: "5rem" }}>
            <h1 className="blue-text text-darken-2">Welcome to PC-Store!! {currentUser && `${currentUser.username} - Token: ${token}`}</h1>
            <p className="grey-text text-darken-1 flow-text">
                Here you can find all computer related stuff, build your own setup, and do not hesitate to ask for help any time...
            </p>
            <div className="section">
                <button className="btn waves-effect waves-light blue darken-2" style={{ marginRight: "2rem" }}>
                    Explore
                </button>
                <span
                    className="grey-text text-lighten-1"
                    style={{ fontSize: "1.2rem" }}
                > - </span>
                <button className="btn waves-effect waves-light teal darken-2" style={{ marginLeft: "2rem" }}>
                    Contact Us
                </button>
            </div>
        </div>
    )
};

export default Home;