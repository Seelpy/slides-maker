import { createReducer } from "@reduxjs/toolkit"
import { changeName, createSlide, moveSlides, deleteSlides, updatePresentation, updateSlide, createObject, updateTextSettings } from "../actions/presentationActions.ts"
import { presentation } from "../../models/example/high.ts";
import ObjectGenerator from "../../services/ObjectGenerator.ts";
import { SlideObjectType, TextObject } from "../../models/types.ts";

const presentationReducer = createReducer(presentation, (builder) => { builder
    .addCase(changeName, (state, action) => {
        state.name = action.payload
    })
    .addCase(createSlide, (state, action) => {
        state.slides.push(action.payload)
    })
    .addCase(moveSlides, (state, action) => {
        const moveSlideIds = action.payload.slides.map(s => s.id);
        let offset = 0;

        for (let i = 0; i < action.payload.pasteIndex - 1; i++) {
            if (moveSlideIds.includes(state.slides[i].id)) offset++;
        }

        state.slides = state.slides.filter(s => !moveSlideIds.includes(s.id));
        state.slides.splice(action.payload.pasteIndex - offset, 0, ...action.payload.slides);
    })
    .addCase(deleteSlides, (state, action) => {
        const toDeleteIds = action.payload.map(s => s.id);
        state.slides = state.slides.filter((slide) => !toDeleteIds.includes(slide.id));
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
    .addCase(createObject, (state, action) => {
        console.log(action)
        let index = state.slides.findIndex((slide) => slide.id == action.payload.slideId)
        let slideInfo = state.slides[index]
        let object = ObjectGenerator.Generate(action.payload.type,action.payload.subtype);
        if (object === undefined) {
            return
        }
        
        slideInfo.slide.push(object)
        state.slides[index] = slideInfo
    })
    .addCase(updateTextSettings, (state, action) => {
        console.log(action)
        let index = state.slides.findIndex((slide) => slide.id == action.payload.slideId)
        let slideInfo = state.slides[index]
        let texts = slideInfo.slide.filter((slide) => slide.selected && slide.type == SlideObjectType.Text)
        slideInfo.slide = slideInfo.slide.filter((slide) => !slide.selected || !(slide.type == SlideObjectType.Text))
        texts = texts.map((text) => {
            let newText: TextObject = text as TextObject
            newText.chars = newText.chars.map((char) => {
                char.fontFamily = action.payload.font ?? char.fontFamily
                char.fontSize = action.payload.size ?? char.fontSize
                char.italic = (action.payload.italic === undefined)?char.italic:!char.italic
                char.bold = (action.payload.bold === undefined)?char.bold:!char.bold
                char.underline = (action.payload.underline === undefined)?char.underline:!char.underline
                console.log(char.fontSize)
                return char
            })
            return newText
        })
        texts.forEach((text) => {
            slideInfo.slide.push(text)
        })
        state.slides[index] = slideInfo
    })
});

export default presentationReducer