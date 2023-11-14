import { createReducer } from "@reduxjs/toolkit"
import { changeName, createSlide, moveSlides, deleteSlides, importPresentation, updateSlide } from "../actions/presentationActions.ts"
import { presentation } from "../../models/example/high.ts";

const presentationReducer = createReducer(presentation, (builder) => { builder
    .addCase(changeName, (state, action) => {
        state.name = action.payload
    })
    .addCase(createSlide, (state, action) => {
        state.slides.push(action.payload)
    })
    .addCase(moveSlides, (state, action) => {
        action.payload.slides.map((slide) => {
            const oldIndex = state.slides.indexOf(slide);
            state.slides.splice(oldIndex - action.payload.moveBy, 0, state.slides.splice(oldIndex, 1)[0]);
        })
    })
    .addCase(deleteSlides, (state, action) => {
        state.slides = state.slides.filter((slide) => !action.payload.includes(slide))
    })
    .addCase(updateSlide, (state, action) => {
        const slideInfo = state.slides.find(s => s.id === action.payload.slide.id);
        if (slideInfo !== undefined) {
            if (action.payload.selected !== undefined) {
                slideInfo.selected = action.payload.selected;
            }
            if (action.payload.oldSlideObject !== undefined && action.payload.newSlideObject !== undefined) {
                slideInfo.slide = slideInfo.slide.map((obj) => obj.id === action.payload.oldSlideObject!.id ? action.payload.newSlideObject! : obj);
            }
            else if (action.payload.newSlideObject !== undefined) {
                slideInfo.slide.push(action.payload.newSlideObject);
            }
        }
    })
    .addCase(importPresentation, (_, action) => action.payload)
});

export default presentationReducer