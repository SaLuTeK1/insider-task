import {configureStore} from "@reduxjs/toolkit";
import {listReducer} from "../store/slices/listSlice";

let store = configureStore({
    reducer:{
        list:listReducer,
    }
})

export {store}