import {createSlice} from "@reduxjs/toolkit";

interface IState {
    trigger:boolean
    login:boolean
}

const initialState: IState = {
    trigger:false,
    login:false
};

const listSlice = createSlice({
    name: 'listSlice',
    initialState,
    reducers: {
        setTrigger:(state,action)=>{
            state.trigger = !state.trigger
        },
        setLogin:(state)=>{
            state.login = !state.login
        }

    },
});

const {reducer: listReducer, actions} = listSlice;

const listAction = {
    ...actions,
}

export {listAction, listReducer}