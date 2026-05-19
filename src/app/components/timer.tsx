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
        let interval:NodeJS.Timeout;
        if (isRunning && value > 0) {
             interval = setInterval(() =>{ dispatch(setTimer(value - 1));},1000);
           
        }
         return () =>{
            if(interval){
             clearInterval(interval);
            }
    };
 }, [isRunning, value, dispatch]);
    const handleAction = (actionType: string) => {
        if (actionType === "started") {dispatch(setIsRunning(true));
              addTimer({ variables: { duration: value, status: "started" } });
        }
        if (actionType === "paused") {dispatch(setIsRunning(false));
              addTimer({ variables: { duration: value, status: "paused" } });
        }
        if (actionType === "reset") {dispatch(resetTimer());
            dispatch(setIsRunning(false));
              addTimer({ variables: { duration: 0, status: "reset" } });
        }
      
    };

    return (
        <div className="flex min-h-screen flex-col items-center  justify-center bg-gray-100">
            <div className="bg-white p-6 rounded-3xl w-11/12  max-w-xs my-auto border border-gray-200 shadow-lg text-center">
                <h1 className="text-2xl font-bold mb-4 text-gray-800">Smart Timer </h1>

                <input
                    type="number"
                    placeholder="Set Seconds"
                    value={value === 0 ? '' :value}
                    onChange={(e) => {
                        const val = Number(e.target.value);
                        dispatch(setTimer(val));
                        dispatch(setIsRunning(false));
                    }}
                    className="border p-2.5 rounded-xl mb-4  w-full text-center"
                />

                <div className="text-5xl font-bold mb-6">{value}</div>

                <div className="flex gap-2">
                    <button onClick={() => handleAction("started")} className="bg-green-500 text-white px-4 py-2 rounded-lg">START</button>
                    <button onClick={() => handleAction("paused")} className="bg-orange-500 text-white px-4 py-2 rounded-lg">PAUSE</button>
                    <button onClick={() => handleAction("reset")} className="bg-red-500 text-white px-4 py-2 rounded-lg">RESET</button>
                </div>
            </div>
        </div>
    );
}