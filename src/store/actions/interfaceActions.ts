import {createAction} from "@reduxjs/toolkit"

enum interfaceActions {
    setActiveIndexSlide = "SET_ACTIVE_INDEX_SLDIE",
    setDragSlides = "SET_DRAG_SLIDES",
    setDragObjects = "SET_DRAG_OBJECTS",
}

export const setActiveIndexSlide = createAction<number>(interfaceActions.setActiveIndexSlide);
export const setDragSlides = createAction<boolean>(interfaceActions.setDragSlides);
export const setDragObjects = createAction<boolean>(interfaceActions.setDragObjects);