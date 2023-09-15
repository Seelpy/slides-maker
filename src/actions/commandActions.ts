import {createAction} from "@reduxjs/toolkit"

enum commandActions {
    addCommand = "ADD_COMMAND",
}

export const addCommand = createAction<string>(commandActions.addCommand)
export default  commandActions