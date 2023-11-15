import { createReducer } from "@reduxjs/toolkit"
import { changeName, createSlide, moveSlide, deleteSlides, updatePresentation, updateSlide } from "../actions/presentationActions.ts"
import { presentation } from "../../models/example/high.ts";

const presentationReducer = createReducer(presentation, (builder) => { builder
    .addCase(changeName, (state, action) => {
        state.name = action.payload
    })
    .addCase(createSlide, (state, action) => {
        state.slides.push(action.payload)
    })
    .addCase(moveSlide, (state, action) => {
        const oldIndex = state.slides.findIndex(s => s.id === action.payload.slide.id);
        const minMove = -oldIndex;
        const maxMove = state.slides.length - oldIndex - 1;
        const moveBy = Math.min(Math.max(action.payload.moveBy, minMove), maxMove);

        // Проверяем, есть ли смысл двигать слайды (есть ли невыделенные слайды выше/ниже)
        let shouldMove = false;
        for (let i = moveBy > 0 ? (oldIndex + 1) : 0; moveBy > 0 ? i < state.slides.length : i < oldIndex; i++) {
            if (!state.slides[i].selected) {
                shouldMove = true;
                break;
            }
        }

        if (shouldMove) {
            state.slides.splice(oldIndex + moveBy, 0, state.slides.splice(oldIndex, 1)[0]);
        }
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
                // удаляем объект на слайде
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