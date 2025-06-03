import React from "react";

function Note(props) {
    return (
        <>
            {props.note && props.note.length !== 0 && (
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <div
                        className={
                            "alert text-center " +
                            (props.note[1] === "success" ? "green" : "red")
                        }
                        role="alert"
                        onClick={props.removeNote}
                    >
                        {props.note[0]}
                    </div>
                </div>
            )}
        </>
    );
}

export default Note;