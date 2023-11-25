import { createReducer } from '@reduxjs/toolkit'
import {
  setActiveSlideId,
  setDragSlides,
  setDragSlidesOrigin,
  setDragSlidesDelta,
  setDragObjects,
  setDragObjectsDelta,
  setSelectingArea,
  setActiveColor,
} from '../actions/interfaceActions.ts'
import { SlideInfo } from '../../models/types.ts'

type initialInterfaceStateType = {
  activeSlideId: string | undefined
  isDraggingSlides: boolean
  dragSlidesOrigin: SlideInfo | undefined
  dragSlidesDelta: number
  isDraggingObjects: boolean
  dragObjectsDelta: number
  isSelectingArea: boolean
  activeColor: string
}

const initialInterfaceState = {
  activeSlideId: undefined,
  isDraggingSlides: false,
  dragSlidesOrigin: undefined,
  dragSlidesDelta: 0,
  isDraggingObjects: false,
  dragObjectsDelta: 0,
  isSelectingArea: false,
  activeColor: '#fa5050',
} as initialInterfaceStateType

const interfaceReducer = createReducer(initialInterfaceState, (builder) => {
  builder
    .addCase(setActiveSlideId, (state, action) => {
      state.activeSlideId = action.payload
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
    .addCase(setSelectingArea, (state, action) => {
      state.isSelectingArea = action.payload
    })
    .addCase(setActiveColor, (state, action) => {
      state.activeColor = action.payload
    })
})

export default interfaceReducer
