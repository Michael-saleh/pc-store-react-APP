import React from "react";

function Note(props) {
    return (
        <>
            {props.note && props.note.length !== 0 && (
                <div
                    style={{
                        position: "fixed",
                        top: "65px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        zIndex: 9999,
                        display: "flex",
                        justifyContent: "center",
                        width: "100%",
                        pointerEvents: "none"
                    }}
                >
                    <div
                        className={
                            "alert text-center " +
                            (props.note[1] === "success" ? "green" : "red")
                        }
                        role="alert"
                        onClick={props.removeNote}
                        style={{
                            opacity: 0.9,
                            pointerEvents: "auto",
                            minWidth: "250px"
                        }}
                    >
                        {props.note[0]}
                    </div>
                </div>
            )}
        </>
    );
}

export default Note;