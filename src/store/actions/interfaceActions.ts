import { createAction } from '@reduxjs/toolkit'
import { SlideInfo } from '../../models/types'

enum interfaceActions {
  setActiveSlideId = 'SET_ACTIVE_SLIDE_ID',
  setDragSlides = 'SET_DRAG_SLIDES',
  setDragSlidesOrigin = 'SET_DRAG_SLIDES_ORIGIN',
  setDragSlidesDelta = 'SET_DRAG_SLIDES_DELTA',
  setDragObjects = 'SET_DRAG_OBJECTS',
  setDragObjectsDelta = 'SET_DRAG_OBJECTS_DELTA',
  setSelectingArea = 'SET_SELECTING_AREA',
  setActiveColor = 'SET_ACTIVE_COLOR',
}

export const setActiveSlideId = createAction<string | undefined>(
  interfaceActions.setActiveSlideId,
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
export const setSelectingArea = createAction<boolean>(
  interfaceActions.setSelectingArea,
)
export const setActiveColor = createAction<string>(
  interfaceActions.setActiveColor,
)