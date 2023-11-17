import { createReducer } from '@reduxjs/toolkit'
import {
  setActiveSlide,
  setDragSlides,
  setDragSlidesOrigin,
  setDragSlidesDelta,
  setDragObjects,
  setDragObjectsDelta,
} from '../actions/interfaceActions.ts'
import { SlideInfo } from '../../models/types.ts'

type initialInterfaceStateType = {
  activeSlide: SlideInfo | undefined
  isDraggingSlides: boolean
  dragSlidesOrigin: SlideInfo | undefined
  dragSlidesDelta: number
  isDraggingObjects: boolean
  dragObjectsDelta: number
}

const initialInterfaceState = {
  activeSlide: undefined,
  isDraggingSlides: false,
  dragSlidesOrigin: undefined,
  dragSlidesDelta: 0,
  isDraggingObjects: false,
  dragObjectsDelta: 0,
} as initialInterfaceStateType

const interfaceReducer = createReducer(initialInterfaceState, (builder) => {
  builder
    .addCase(setActiveSlide, (state, action) => {
      state.activeSlide = action.payload
    })
    .addCase(setDragSlides, (state, action) => {
      state.isDraggingSlides = action.payload
    })
    .addCase(setDragSlidesOrigin, (state, action) => {
      state.dragSlidesOrigin = action.payload
    })
    .addCase(setDragSlidesDelta, (state, action) => {
      state.dragSlidesDelta = action.payload
    })
    .addCase(setDragObjects, (state, action) => {
      state.isDraggingObjects = action.payload
    })
    .addCase(setDragObjectsDelta, (state, action) => {
      state.dragObjectsDelta = action.payload
    })
})

export default interfaceReducer
