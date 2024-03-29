import { createReducer } from "../createReducer.ts"
import {
  changeName,
  createObject,
  createSlide,
  deleteSlides,
  importImage,
  updateBackground,
  moveSlides,
  updateColor,
  updatePresentation,
  updateSlide,
  updateTextSettings,
  moveObjectsInArray,
} from "../actions/presentationActions.ts"
import GenerateObject from "../../services/ObjectGenerator.ts"
import { Presentaion, SlideInfo, SlideObjectType, TextAlign } from "../../models/types.ts"

let initialPresentationState: Presentaion = {
  name: "presentation",
  slides: [],
}

const presentationReducer = createReducer(initialPresentationState, {
  [changeName.type]: (state, action: typeof changeName.actionInstance) => {
    return { ...state, name: action.payload }
  },
  [createSlide.type]: (state, action: typeof createSlide.actionInstance) => {
    return { ...state, slides: [...state.slides, action.payload] }
  },
  [moveSlides.type]: (state, action: typeof moveSlides.actionInstance) => {
    const moveSlideIds = action.payload.slides.map((s) => s.id)
    let offset = 0

    for (let i = 0; i < action.payload.pasteIndex - 1; i++) {
      if (moveSlideIds.includes(state.slides[i].id)) offset++
    }

    const newSlides = state.slides.filter((s) => !moveSlideIds.includes(s.id))
    newSlides.splice(
      action.payload.pasteIndex - offset,
      0,
      ...action.payload.slides,
    )
    return { ...state, slides: newSlides }
  },
  [deleteSlides.type]: (state, action: typeof deleteSlides.actionInstance) => {
    const toDeleteIds = action.payload.map((s) => s.id)
    const newSlides = state.slides.filter(
      (slide) => !toDeleteIds.includes(slide.id),
    )
    return { ...state, slides: newSlides }
  },
  [updateSlide.type]: (state, action: typeof updateSlide.actionInstance) => {
    const newSlides = [...state.slides]
    const index = newSlides.findIndex(
      (slide) => slide.id == action.payload.slideId,
    )
    if (index < 0) {
      return { ...state }
    }

    if (action.payload.selected !== undefined) {
      // обновляем selected у слайда, убираем выделение объектов
      for (let i = 0; i < newSlides.length; i++) {
        newSlides[i] = {
          ...newSlides[i],
          selected:
            newSlides[i].id === action.payload.slideId
              ? action.payload.selected
              : newSlides[i].selected,
          slide: newSlides[i].slide.map((obj) => ({ ...obj, selected: false })),
        }
      }
    }

    const currentSlide = newSlides.find((s) => s.id === action.payload.slideId)
    const slideInfo = {
      ...currentSlide,
      slide: [...currentSlide!.slide],
    } as SlideInfo

    if (
      action.payload.oldSlideObject !== undefined &&
      action.payload.newSlideObject !== undefined
    ) {
      // обновляем объект на слайде
      slideInfo!.slide = slideInfo!.slide.map((obj) =>
        obj.id === action.payload.oldSlideObject!.id
          ? action.payload.newSlideObject!
          : obj,
      )
    } else if (
      action.payload.oldSlideObject !== undefined &&
      action.payload.newSlideObject === undefined
    ) {
      // удаляем объект на слайде
      const objIndex = slideInfo!.slide.findIndex(
        (obj) => obj.id === action.payload.oldSlideObject!.id,
      )
      if (objIndex !== -1) {
        slideInfo!.slide.splice(objIndex, 1)
      }
    } else if (action.payload.newSlideObject !== undefined) {
      // создаём объект на слайде
      slideInfo!.slide.push(action.payload.newSlideObject)
    }

    // обновляем изменённый слайд в новом списке
    newSlides[index] = slideInfo

    // если выделили объект - убираем выделение слайдов
    if (
      action.payload.newSlideObject &&
      action.payload.newSlideObject.selected
    ) {
      newSlides.map((s) => (s.selected = false))
    }

    return { ...state, slides: newSlides }
  },
  [updatePresentation.type]: (
    _,
    action: typeof updatePresentation.actionInstance,
  ) => ({ ...action.payload }),
  [createObject.type]: (state, action: typeof createObject.actionInstance) => {
    const newSlides = [...state.slides]
    const index = newSlides.findIndex(
      (slide) => slide.id == action.payload.slideId,
    )

    const object = GenerateObject(action.payload.type, action.payload.subtype)
    if (object === undefined) {
      return { ...state }
    }
    if (action.payload.color) {
      if (
        object.type === SlideObjectType.Primitive ||
        object.type === SlideObjectType.Text
      ) {
        object.color = action.payload.color
      }
    }
    if (action.payload.font && object.type === SlideObjectType.Text) {
      object.fontFamily = action.payload.font
    }
    if (action.payload.fontSize && object.type === SlideObjectType.Text) {
      object.fontSize = action.payload.fontSize
    }
    newSlides[index] = {
      ...newSlides[index],
      slide: [...newSlides[index].slide, object],
    }
    return { ...state, slides: newSlides }
  },
  [updateTextSettings.type]: (
    state,
    action: typeof updateTextSettings.actionInstance,
  ) => {
    const newSlides = [...state.slides]
    const index = newSlides.findIndex(
      (slide) => slide.id == action.payload.slideId,
    )
    if (index < 0) {
      return { ...state }
    }

    newSlides[index] = {
      ...newSlides[index],
      slide: newSlides[index].slide.map((originalObj) => {
        const obj = { ...originalObj }
        if (obj.selected && obj.type === SlideObjectType.Text) {
          obj.fontFamily = action.payload.font ?? obj.fontFamily
          obj.fontSize = action.payload.size ?? obj.fontSize
          obj.align = (action.payload.align as TextAlign) ?? obj.align
          obj.italic = action.payload.italic ? !obj.italic : obj.italic
          obj.bold = action.payload.bold ? !obj.bold : obj.bold
          obj.underline = action.payload.underline
            ? !obj.underline
            : obj.underline
        }
        return obj
      }),
    }

    return { ...state, slides: newSlides }
  },
  [updateColor.type]: (state, action: typeof updateColor.actionInstance) => {
    const newSlides = [...state.slides]
    const index = newSlides.findIndex(
      (slide) => slide.id == action.payload.slideId,
    )
    if (index < 0) {
      return { ...state }
    }

    newSlides[index] = {
      ...newSlides[index],
      slide: newSlides[index].slide.map((originalObj) => {
        const obj = { ...originalObj }
        if (obj.selected && obj.type != SlideObjectType.Image) {
          obj.color = action.payload.color
        }
        return obj
      }),
    }

    return { ...state, slides: newSlides }
  },
  [importImage.type]: (state, action: typeof importImage.actionInstance) => {
    const newSlides = [...state.slides]
    const index = newSlides.findIndex(
      (slide) => slide.id == action.payload.slideId,
    )
    if (index < 0) {
      return { ...state }
    }

    const image = GenerateObject(
      SlideObjectType.Image,
      undefined,
      action.payload.data,
    )

    if (image != undefined) {
      if (action.payload.width && action.payload.height) {
        image.size.width = action.payload.width
        image.size.height = action.payload.height
      }

      newSlides[index] = {
        ...newSlides[index],
        slide: [...newSlides[index].slide, image],
      }
    }

    return { ...state, slides: newSlides }
  },
  [updateBackground.type]: (
    state,
    action: typeof updateBackground.actionInstance,
  ) => {
    const newSlides = [...state.slides]
    const index = newSlides.findIndex(
      (slide) => slide.id == action.payload.slideId,
    )
    if (index < 0) {
      return { ...state }
    }

    newSlides[index] = { ...newSlides[index], background: action.payload.data }
    return { ...state, slides: newSlides }
  },
  [moveObjectsInArray.type]: (
    state,
    action: typeof moveObjectsInArray.actionInstance,
  ) => {
    const newSlides = [...state.slides]
    const activeSlideIndex = state.slides.findIndex(
      (slide) => slide.id == action.payload.slideId,
    )
    if (activeSlideIndex === -1) {
      return { ...state }
    }

    const newSlide = {...newSlides[activeSlideIndex]}
    const objectsArray = [...newSlide.slide]

    if (action.payload.moveBy < 0) {
      for (let i = 1; i < objectsArray.length; i++) {
        if (objectsArray[i].selected && !objectsArray[i-1].selected) {
          [objectsArray[i-1], objectsArray[i]] = [objectsArray[i], objectsArray[i-1]]
        }
      }
    } else {
      for (let i = objectsArray.length - 2; i >= 0; i--) {
        if (objectsArray[i].selected && !objectsArray[i+1].selected) {
          [objectsArray[i+1], objectsArray[i]] = [objectsArray[i], objectsArray[i+1]]
        }
      }
    }

    newSlide.slide = objectsArray
    newSlides[activeSlideIndex] = newSlide
    return { ...state, slides: newSlides }
  },
})

export default presentationReducer
