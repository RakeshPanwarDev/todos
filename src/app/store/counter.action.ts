import { createAction } from "@ngrx/store";

//increment action
export const increment = createAction('[Counter] Increment'); 

//decrement action
export const decrement = createAction('[Counter] Decrement'); 

//reset action
export const reset = createAction('[Counter] Reset');