"use client";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setTimer, setIsRunning, resetTimer } from '../redux/timerSlice';
import { useEffect } from "react";
import {gql} from '@apollo/client';
import { useMutation } from "@apollo/client/react";
const ADD_TIMER = gql`
  mutation AddTimer($duration: Int!, $status: String!) {
    addTimer(duration: $duration, status: $status) {
      id
    }
  }
`;
export default function Timer() {
    const dispatch = useDispatch();
    const { value, isRunning } = useSelector((state: RootState) => state.Timer);
    
    
    const [addTimer] = useMutation(ADD_TIMER);

    
    useEffect(() => {
        if (isRunning && value > 0) {
            const interval = setInterval(() => dispatch(setTimer(value - 1)), 1000);
            return () => clearInterval(interval);
        }
    }, [isRunning, value, dispatch]);
    const handleAction = (actionType: string) => {
        if (actionType === "start") dispatch(setIsRunning(true));
        if (actionType === "pause") dispatch(setIsRunning(false));
        if (actionType === "reset") dispatch(resetTimer());

    
        addTimer({ variables: { duration: value, status: actionType } });
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
            <div className="bg-white p-10 rounded-3xl shadow-xl text-center">
                <h1 className="text-2xl font-bold mb-5">Smart Timer </h1>

                <input
                    type="number"
                    placeholder="Set Seconds"
                    onChange={(e) => dispatch(setTimer(Number(e.target.value)))}
                    className="border p-2 rounded mb-5 w-full text-center"
                />

                <div className="text-6xl font-bold mb-10">{value}</div>

                <div className="flex gap-4">
                    <button onClick={() => handleAction("started")} className="bg-green-500 text-white px-6 py-2 rounded-lg">START</button>
                    <button onClick={() => handleAction("paused")} className="bg-orange-500 text-white px-6 py-2 rounded-lg">PAUSE</button>
                    <button onClick={() => handleAction("reseted")} className="bg-red-500 text-white px-6 py-2 rounded-lg">RESET</button>
                </div>
            </div>
        </div>
    );
}