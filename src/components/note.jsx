import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeNote } from "../App/features/noteSlice"

function Note() {

    const dispatch = useDispatch();
    const note = useSelector((state) => state.note.message)

    return (
        <>
            {note && note.length !== 0 && (
                <div
                    onClick={() => dispatch(removeNote())}
                    style={{
                        position: "fixed",
                        top: "65px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        zIndex: 9999,
                        display: "flex",
                        justifyContent: "center",
                        width: "100%",
                        // pointerEvents: "none"
                    }}
                >
                    <div
                        className={
                            "alert text-center " +
                            (note[1] === "success" ? "green" : "red")
                        }
                        role="alert"

                        style={{
                            opacity: 0.9,
                            pointerEvents: "auto",
                            minWidth: "250px"
                        }}
                    >
                        {note[0]}
                    </div>
                </div>
            )}
        </>
    );
}

export default Note;