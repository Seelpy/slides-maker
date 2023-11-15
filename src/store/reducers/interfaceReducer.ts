import { createReducer } from "@reduxjs/toolkit"
import { setActiveSlide, setDragSlides, setDragObjects, setMovedSlides } from "../actions/interfaceActions.ts"
import { SlideInfo } from "../../models/types.ts";

type initialInterfaceStateType = {
    activeSlide: SlideInfo | undefined;
    isDraggingSlides: boolean;
    isDraggingObjects: boolean;
    didMoveSlides: boolean;
}

const initialInterfaceState = {
    activeSlide: undefined,
    isDraggingSlides: false,
    isDraggingObjects: false,
    didMoveSlides: false,
} as initialInterfaceStateType;

const interfaceReducer = createReducer(initialInterfaceState, (builder) => { builder
    .addCase(setActiveSlide, (state, action) => {
        state.activeSlide = action.payload;
    })
    .addCase(setDragSlides, (state, action) => {
        state.isDraggingSlides = action.payload;
    })
    .addCase(setDragObjects, (state, action) => {
        state.isDraggingObjects = action.payload;
    })
    .addCase(setMovedSlides, (state, action) => {
        state.didMoveSlides = action.payload;
    })
});

export default interfaceReducer