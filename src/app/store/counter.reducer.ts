import { createReducer, on } from "@ngrx/store";
import { decrement, increment, reset } from "./counter.action";

//initial state
export const initialState = 0;

export const counterReducer = createReducer(
    initialState,
    //on increment action increase state by 1
    on(increment, (state) => state + 1),

    //on decrement action decrease state by 1   
    on(decrement, (state) => state > 0 ? state - 1 : state),

    //on reset action set state to 0
    on(reset, () =>initialState),
);