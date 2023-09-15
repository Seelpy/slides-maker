import {configureStore} from "@reduxjs/toolkit"
import commandReducer from "../reducers/commandReducer.ts";

const store = configureStore({
    reducer: {
        user: commandReducer,
    },
})

export default store
