import { createAction } from '../createAction'
import { SlideInfo } from '../../models/types'

enum InterfaceActions {
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
  InterfaceActions.setActiveSlideId,
)
export const setDragSlides = createAction<boolean>(
  InterfaceActions.setDragSlides,
)
export const setDragSlidesOrigin = createAction<SlideInfo | undefined>(
  InterfaceActions.setDragSlidesOrigin,
)
export const setDragSlidesDelta = createAction<number>(
  InterfaceActions.setDragSlidesDelta,
)
export const setDragObjects = createAction<boolean>(
  InterfaceActions.setDragObjects,
)
export const setDragObjectsDelta = createAction<number>(
  InterfaceActions.setDragObjectsDelta,
)
export const setSelectingArea = createAction<boolean>(
  InterfaceActions.setSelectingArea,
)
export const setActiveColor = createAction<string>(
  InterfaceActions.setActiveColor,
)