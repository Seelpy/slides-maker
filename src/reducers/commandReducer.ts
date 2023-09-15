import {createReducer} from "@reduxjs/toolkit"
import {addCommand} from "../actions/commandActions.ts"
import {upByQueue, downByQueue} from "../actions/queueActions.ts"

const initialState:{queue: string[], top: number} = {
    queue: [],
    top: 0,
}

const commandReducer = createReducer(initialState, (builder) => {
    builder.addCase(addCommand, (state, action) => {
        state.queue.push(action.payload)
    });
    builder.addCase(upByQueue, (state) => {
        state.top += 1
    });
    builder.addCase(downByQueue, (state) => {
        state.top -= 1
    });

});

export default commandReducer