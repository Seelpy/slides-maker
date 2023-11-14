import {createAction} from "@reduxjs/toolkit"

enum interfaceActions {
    setActiveSlideIndex = "SET_ACTIVE_SLIDE_INDEX",
    setDragSlides = "SET_DRAG_SLIDES",
    setDragObjects = "SET_DRAG_OBJECTS",
}

export const setActiveSlideIndex = createAction<number>(interfaceActions.setActiveSlideIndex);
export const setDragSlides = createAction<boolean>(interfaceActions.setDragSlides);
export const setDragObjects = createAction<boolean>(interfaceActions.setDragObjects);