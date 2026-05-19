import {createSlice,PayloadAction} from '@reduxjs/toolkit';
interface TimerState {
    value:number;
    isRunning:boolean;  
};
const initialState : TimerState={
    value:0,
    isRunning:false,
};
export const timerSlice = createSlice({
name:'timer',
initialState,
reducers:{
    setTimer:(state,action:PayloadAction<number>)=>{
        state.value = action.payload;
    },
    setIsRunning : (state,action:PayloadAction<boolean>)=>{
        state.isRunning = action.payload;
    },
    resetTimer:(state)=>{
        state.value = 0;
        state.isRunning =false;
    }
},
});
export const {setTimer,setIsRunning,resetTimer} = timerSlice.actions;
export default timerSlice.reducer;