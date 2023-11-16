import { createAction } from '@reduxjs/toolkit'
import { SlideInfo } from '../../models/types'

enum interfaceActions {
  setActiveSlide = 'SET_ACTIVE_SLIDE',
  setDragSlides = 'SET_DRAG_SLIDES',
  setDragSlidesOrigin = 'SET_DRAG_SLIDES_ORIGIN',
  setDragSlidesDelta = 'SET_DRAG_SLIDES_DELTA',
  setDragObjects = 'SET_DRAG_OBJECTS',
  setDragObjectsDelta = 'SET_DRAG_OBJECTS_DELTA',
}

export const setActiveSlide = createAction<SlideInfo | undefined>(
  interfaceActions.setActiveSlide,
)
export const setDragSlides = createAction<boolean>(
  interfaceActions.setDragSlides,
)
export const setDragSlidesOrigin = createAction<SlideInfo | undefined>(
  interfaceActions.setDragSlidesOrigin,
)
export const setDragSlidesDelta = createAction<number>(
  interfaceActions.setDragSlidesDelta,
)
export const setDragObjects = createAction<boolean>(
  interfaceActions.setDragObjects,
)
export const setDragObjectsDelta = createAction<number>(
  interfaceActions.setDragObjectsDelta,
)
