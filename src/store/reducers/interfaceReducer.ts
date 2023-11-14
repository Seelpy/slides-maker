import { createReducer } from "@reduxjs/toolkit"
import { setActiveSlideIndex, setDragSlides, setDragObjects } from "../actions/interfaceActions.ts"

const initialInterfaceState = {
    activeSlideIndex: 0,
    isDraggingSlides: false,
    isDraggingObjects: false,
};

const interfaceReducer = createReducer(initialInterfaceState, (builder) => { builder
    .addCase(setActiveSlideIndex, (state, action) => {
        state.activeSlideIndex = action.payload;
    })
    .addCase(setDragSlides, (state, action) => {
        state.isDraggingSlides = action.payload;
    })
    .addCase(setDragObjects, (state, action) => {
        state.isDraggingObjects = action.payload;
    })
});

export default interfaceReducer