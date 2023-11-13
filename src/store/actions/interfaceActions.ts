import {createAction} from "@reduxjs/toolkit"

enum interfaceActions {
    setDragSlides = "SET_DRAG_SLIDES",
    setDragObjects = "SET_DRAG_OBJECTS",
}

export const setDragSlides = createAction<boolean>(interfaceActions.setDragSlides);
export const setDragObjects = createAction<boolean>(interfaceActions.setDragObjects);

export default interfaceActions