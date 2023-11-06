import {configureStore} from '@reduxjs/toolkit';
import CountReducer from './CountSlice'

const store = configureStore({
    reducer : {
        Count : CountReducer,
    }
})

export default store;