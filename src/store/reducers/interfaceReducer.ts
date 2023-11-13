import { createReducer } from "@reduxjs/toolkit"
import { setActiveIndexSlide, setDragSlides, setDragObjects } from "../actions/interfaceActions.ts"

const initialInterfaceState = {
    activeIndexSlide: 0,
    isDraggingSlides: false,
    isDraggingObjects: false,
};

const interfaceReducer = createReducer(initialInterfaceState, (builder) => { builder
    .addCase(setActiveIndexSlide, (state, action) => {
        state.activeIndexSlide = action.payload;
    })
    .addCase(setDragSlides, (state, action) => {
        state.isDraggingSlides = action.payload;
        state.isDraggingObjects = !action.payload;
    })
    .addCase(setDragObjects, (state, action) => {
        state.isDraggingObjects = action.payload;
        state.isDraggingSlides = !action.payload;
    })
});

export default interfaceReducer