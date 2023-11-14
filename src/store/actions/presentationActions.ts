import {createAction} from "@reduxjs/toolkit"
import { Presentaion, SlideInfo, SlideObject } from "../../models/types";

enum presentationActions {
    changeName = "CHANGE_NAME",
    createSlide = "CREATE_SLIDE",
    moveSlides = "MOVE_SLIDES",
    deleteSlides = "DELETE_SLIDES",
    updateSlide = "UPDATE_SLIDE",
    updatePresentation = "UPDATE_PRESENTATION",
}

type moveSlidesPayload = {
    slides: SlideInfo[];
    moveBy: number;
}

type updateSlidePayload = {
    slide: SlideInfo;
    selected?: boolean;
    oldSlideObject?: SlideObject;
    newSlideObject?: SlideObject;
}

export const changeName = createAction<string>(presentationActions.changeName);
export const createSlide = createAction<SlideInfo>(presentationActions.createSlide);
export const moveSlides = createAction<moveSlidesPayload>(presentationActions.moveSlides);
export const deleteSlides = createAction<SlideInfo[]>(presentationActions.deleteSlides);
export const updateSlide = createAction<updateSlidePayload>(presentationActions.updateSlide);
export const updatePresentation = createAction<Presentaion>(presentationActions.updatePresentation);