import React, { useState } from "react";

const Home = () => {

    return (
        <div className="container center-align" style={{ marginTop: "5rem" }}>
            <h1 className="blue-text text-darken-2">Welcome to PC-Store!!</h1>
            <p className="grey-text text-darken-1 flow-text">
                Here you can find all computer related stuff, build your own setup, and do not hesitate to ask for help any time...
            </p>
            <div className="section">
                <button className="btn waves-effect waves-light blue darken-2" style={{ marginRight: "1rem" }}>
                    Explore
                </button>
                <span className="grey-text text-lighten-1" style={{ fontSize: "1.2rem" }}> - </span>
                <button className="btn waves-effect waves-light teal darken-2">
                    Contact Us
                </button>
            </div>
        </div>
    )
};

export default Home;