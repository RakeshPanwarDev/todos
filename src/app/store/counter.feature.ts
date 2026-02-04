import { createFeature } from "@ngrx/store";
import { counterReducer } from "./counter.reducer";

export const counterFeature = createFeature({
    name: 'counter',
    reducer: counterReducer,
}); 