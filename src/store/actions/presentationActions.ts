import {createAction} from "@reduxjs/toolkit"
import { SlideInfo } from "../../models/types";

enum presentationActions {
    changeName = "CHANGE_NAME",
    createSlide = "CREATE_SLIDE",
    moveSlides = "MOVE_SLIDES",
    deleteSlides = "DELETE_SLIDES",
}

type moveSlidesPayload = {
    slides: SlideInfo[];
    moveBy: number;
}

export const changeName = createAction<string>(presentationActions.changeName);
export const createSlide = createAction<SlideInfo>(presentationActions.createSlide);
export const moveSlides = createAction<moveSlidesPayload>(presentationActions.moveSlides);
export const deleteSlides = createAction<SlideInfo[]>(presentationActions.deleteSlides);

export default presentationActions