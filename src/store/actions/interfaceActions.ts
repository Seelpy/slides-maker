import {createAction} from "@reduxjs/toolkit"
import { SlideInfo } from "../../models/types";

enum interfaceActions {
    setActiveSlide = "SET_ACTIVE_SLIDE",
    setDragSlides = "SET_DRAG_SLIDES",
    setDragObjects = "SET_DRAG_OBJECTS",
    setMovedSlides = "SET_MOVED_SLIDES",
}

export const setActiveSlide = createAction<SlideInfo>(interfaceActions.setActiveSlide);
export const setDragSlides = createAction<boolean>(interfaceActions.setDragSlides);
export const setDragObjects = createAction<boolean>(interfaceActions.setDragObjects);
export const setMovedSlides = createAction<boolean>(interfaceActions.setMovedSlides);