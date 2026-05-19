import {configureStore} from '@reduxjs/toolkit';
import timerReducer from './timerSlice';
export const store = configureStore({
    reducer:{
        Timer:timerReducer,
    }
});
export type RootState = ReturnType <typeof store.getState>;
export type Dispatch = typeof  store.dispatch;
