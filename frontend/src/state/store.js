import { configureStore } from "@reduxjs/toolkit"
import analyticReducer from "./sliceReducer"

export const store = configureStore({
    reducer: analyticReducer
})