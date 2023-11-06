import { createSlice } from "@reduxjs/toolkit";

const initialState = { 
    count : 0,
}

const CountSlice = createSlice({
    name : "count", 
    initialState : initialState,
    reducers : {
        getCount  : (state, action)=>{
            state.count = action.payload.count;
        }   
    }
})

export const CountActions = CountSlice.actions;

export default CountSlice.reducer;