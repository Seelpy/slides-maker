import { createAction } from '../createAction'
import { Presentaion, SlideInfo, SlideObject } from '../../models/types'

enum PresentationActions {
  changeName = 'CHANGE_NAME',
  createSlide = 'CREATE_SLIDE',
  moveSlides = 'MOVE_SLIDES',
  deleteSlides = 'DELETE_SLIDES',
  updateSlide = 'UPDATE_SLIDE',
  updatePresentation = 'UPDATE_PRESENTATION',
  createObject = 'CREATE_OBJECT',
  updateTextSettings = 'UPDATE_TEXT_SETTINGS',
  updateColor = 'UPDATE_COLOR',
  importImage = 'IMPORT_IMAGE',
  updateBackground = 'UPDATE_BACKGROUND'
}

type MoveSlidesPayload = {
  slides: SlideInfo[]
  pasteIndex: number
}

type UpdateSlidePayload = {
  slideId: string
  selected?: boolean
  oldSlideObject?: SlideObject
  newSlideObject?: SlideObject
}

type CreateObjectPayload = {
  slideId: string
  type: string
  subtype?: string
  color?: string
}

type UpdateTextSettingsPayload = {
  slideId: string
  font?: string
  size?: number
  italic?: boolean
  bold?: boolean
  underline?: boolean
  align?: string
}

type UpdateColorPayload = {
  slideId: string
  color: string
}

type ImportImagePayload = {
  slideId: string
  data: string
  width?: number
  height?: number
}

export const changeName = createAction<string>(PresentationActions.changeName)
export const createSlide = createAction<SlideInfo>(
  PresentationActions.createSlide,
)
export const moveSlides = createAction<MoveSlidesPayload>(
  PresentationActions.moveSlides,
)
export const deleteSlides = createAction<SlideInfo[]>(
  PresentationActions.deleteSlides,
)
export const updateSlide = createAction<UpdateSlidePayload>(
  PresentationActions.updateSlide,
)
export const updatePresentation = createAction<Presentaion>(
  PresentationActions.updatePresentation,
)
export const createObject = createAction<CreateObjectPayload>(
  PresentationActions.createObject,
)
export const updateTextSettings = createAction<UpdateTextSettingsPayload>(
  PresentationActions.updateTextSettings,
)
export const updateColor = createAction<UpdateColorPayload>(
  PresentationActions.updateColor,
)
export const importImage = createAction<ImportImagePayload>(
  PresentationActions.importImage,
)
export const updateBackground = createAction<ImportImagePayload>(
  PresentationActions.updateBackground,
)