import { createReducer } from "@reduxjs/toolkit"
import { changeName, createSlide, moveSlides, deleteSlides, updatePresentation, updateSlide } from "../actions/presentationActions.ts"
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
            const oldIndex = state.slides.findIndex(s => s.id === slide.id);
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
                // обновляем selected у слайда
                slideInfo.selected = action.payload.selected;
            }
            if (action.payload.oldSlideObject !== undefined && action.payload.newSlideObject !== undefined) {
                // обновляем объект на слайде
                slideInfo.slide = slideInfo.slide.map((obj) => obj.id === action.payload.oldSlideObject!.id ? action.payload.newSlideObject! : obj);
            }
            else if (action.payload.oldSlideObject !== undefined && action.payload.newSlideObject === undefined) {
                // удаляемо объект на слайде
                const objIndex = slideInfo.slide.findIndex(obj => obj.id === action.payload.oldSlideObject!.id);
                if (objIndex !== -1) {
                    slideInfo.slide.splice(objIndex, 1);
                }
            }
            else if (action.payload.newSlideObject !== undefined) {
                // создаём объект на слайде
                slideInfo.slide.push(action.payload.newSlideObject);
            }
        }
    })
    .addCase(updatePresentation, (_, action) => action.payload)
});

export default presentationReducer