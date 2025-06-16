import { createSlice } from '@reduxjs/toolkit';

const noteSlice = createSlice({
    name: 'note',
    initialState: {
        message: []
    },
    reducers: {
        makeNote: (state, action) => {
            state.message = action.payload;
        },
        removeNote: (state) => {
            state.message = [];
        }
    }
});

export const { makeNote, removeNote } = noteSlice.actions;


// Thunk to create a note and remove it after 5 seconds
export const createNote = (payload) => (dispatch) => {
    dispatch(makeNote(payload));
    setTimeout(() => {
        dispatch(removeNote());
    }, 5000);
};

// Export reducer
export default noteSlice.reducer;
