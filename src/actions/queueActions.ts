import {createAction} from "@reduxjs/toolkit"

enum queueActions {
    up = "UP_BY_QUEUE",
    down = "DOWN_BY_QUEUE",
}

const upByQueue = createAction<string>(queueActions.up)
const downByQueue = createAction<string>(queueActions.down)

export {upByQueue, downByQueue}

export default queueActions