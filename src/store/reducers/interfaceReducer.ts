import { createReducer } from '../createReducer.ts'
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

const interfaceReducer = createReducer(initialInterfaceState, {
    [setActiveSlideId.type]: (state, action: typeof setActiveSlideId.actionInstance) => {
      return {...state, activeSlideId: action.payload}
    },
    [setDragSlides.type]: (state, action: typeof setDragSlides.actionInstance) => {
      return {...state, isDraggingSlides: action.payload}
    },
    [setDragSlidesOrigin.type]: (state, action: typeof setDragSlidesOrigin.actionInstance) => {
      return {...state, dragSlidesOrigin: action.payload}
    },
    [setDragSlidesDelta.type]: (state, action: typeof setDragSlidesDelta.actionInstance) => {
      return {...state, dragSlidesDelta: action.payload}
    },
    [setDragObjects.type]: (state, action: typeof setDragObjects.actionInstance) => {
      return {...state, isDraggingObjects: action.payload}
    },
    [setDragObjectsDelta.type]: (state, action: typeof setDragObjectsDelta.actionInstance) => {
      return {...state, dragObjectsDelta: action.payload}
    },
    [setSelectingArea.type]: (state, action: typeof setSelectingArea.actionInstance) => {
      return {...state, isSelectingArea: action.payload}
    },
    [setActiveColor.type]: (state, action: typeof setActiveColor.actionInstance) => {
      return {...state, activeColor: action.payload}
    }
})

export default interfaceReducer
