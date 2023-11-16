import { createAction } from '@reduxjs/toolkit'
import { Presentaion, SlideInfo, SlideObject } from '../../models/types'

enum presentationActions {
  changeName = 'CHANGE_NAME',
  createSlide = 'CREATE_SLIDE',
  moveSlides = 'MOVE_SLIDES',
  deleteSlides = 'DELETE_SLIDES',
  updateSlide = 'UPDATE_SLIDE',
  updatePresentation = 'UPDATE_PRESENTATION',
  createObject = 'CREATE_OBJECT',
  updateTextSettings = 'UPDATE_TEXT_SETTINGS',
}

type moveSlidesPayload = {
  slides: SlideInfo[]
  pasteIndex: number
}

type updateSlidePayload = {
  slide: SlideInfo
  selected?: boolean
  oldSlideObject?: SlideObject
  newSlideObject?: SlideObject
}

type createObjectPayload = {
  slideId: string
  type: string
  subtype?: string
}

type updateTextSettingsPayload = {
  slideId: string
  font?: string
  size?: number
  italic?: boolean
  bold?: boolean
  underline?: boolean
}

export const changeName = createAction<string>(presentationActions.changeName)
export const createSlide = createAction<SlideInfo>(
  presentationActions.createSlide,
)
export const moveSlides = createAction<moveSlidesPayload>(
  presentationActions.moveSlides,
)
export const deleteSlides = createAction<SlideInfo[]>(
  presentationActions.deleteSlides,
)
export const updateSlide = createAction<updateSlidePayload>(
  presentationActions.updateSlide,
)
export const updatePresentation = createAction<Presentaion>(
  presentationActions.updatePresentation,
)
export const createObject = createAction<createObjectPayload>(
  presentationActions.createObject,
)
export const updateTextSettings = createAction<updateTextSettingsPayload>(
  presentationActions.updateTextSettings,
)
