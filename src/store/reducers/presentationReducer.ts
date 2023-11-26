import { createReducer } from '@reduxjs/toolkit'
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
} from '../actions/presentationActions.ts'
import { presentation } from '../../models/example/high.ts'
import ObjectGenerator from '../../services/ObjectGenerator.ts'
import {
  CircleObject,
  SlideObjectType,
  SquareObject,
  TriangleObject,
} from '../../models/types.ts'
import objectGenerator from '../../services/ObjectGenerator.ts'

const presentationReducer = createReducer(presentation, (builder) => {
  builder
    .addCase(changeName, (state, action) => {
      state.name = action.payload
    })
    .addCase(createSlide, (state, action) => {
      state.slides.push(action.payload)
    })
    .addCase(moveSlides, (state, action) => {
      const moveSlideIds = action.payload.slides.map((s) => s.id)
      let offset = 0

      for (let i = 0; i < action.payload.pasteIndex - 1; i++) {
        if (moveSlideIds.includes(state.slides[i].id)) offset++
      }

      state.slides = state.slides.filter((s) => !moveSlideIds.includes(s.id))
      state.slides.splice(
        action.payload.pasteIndex - offset,
        0,
        ...action.payload.slides,
      )
    })
    .addCase(deleteSlides, (state, action) => {
      const toDeleteIds = action.payload.map((s) => s.id)
      state.slides = state.slides.filter(
        (slide) => !toDeleteIds.includes(slide.id),
      )
    })
    .addCase(updateSlide, (state, action) => {
      const slideInfo = state.slides.find(
        (s) => s.id === action.payload.slide.id,
      )
      if (slideInfo !== undefined) {
        if (action.payload.selected !== undefined) {
          // обновляем selected у слайда, убираем выделение объектов
          slideInfo.selected = action.payload.selected
          state.slides.map((s) => s.slide.map((obj) => obj.selected = false))
        }
        if (
          action.payload.oldSlideObject !== undefined &&
          action.payload.newSlideObject !== undefined
        ) {
          // обновляем объект на слайде
          slideInfo.slide = slideInfo.slide.map((obj) =>
            obj.id === action.payload.oldSlideObject!.id
              ? action.payload.newSlideObject!
              : obj,
          )
        } else if (
          action.payload.oldSlideObject !== undefined &&
          action.payload.newSlideObject === undefined
        ) {
          // удаляем объект на слайде
          const objIndex = slideInfo.slide.findIndex(
            (obj) => obj.id === action.payload.oldSlideObject!.id,
          )
          if (objIndex !== -1) {
            slideInfo.slide.splice(objIndex, 1)
          }
        } else if (action.payload.newSlideObject !== undefined) {
          // создаём объект на слайде
          slideInfo.slide.push(action.payload.newSlideObject)
        }

        // если выделили объект - убираем выделение слайдов
        if (action.payload.newSlideObject && 
          action.payload.newSlideObject.selected) {
          state.slides.map((s) => s.selected = false)
        }
      }
    })
    .addCase(updatePresentation, (_, action) => action.payload)
    .addCase(createObject, (state, action) => {
      const index = state.slides.findIndex(
        (slide) => slide.id == action.payload.slideId,
      )
      const slideInfo = state.slides[index]
      const object = ObjectGenerator.Generate(
        action.payload.type,
        action.payload.subtype,
      )
      if (object === undefined) {
        return
      }
      if (action.payload.color) {
        if (object.type === SlideObjectType.Primitive
          || object.type === SlideObjectType.Text) {
          object.color = action.payload.color
        }
      }
      slideInfo.slide.push(object)
    })
    .addCase(updateTextSettings, (state, action) => {
      const slideInfo = state.slides.find(
        (slide) => slide.id == action.payload.slideId,
      )
      slideInfo!.slide = slideInfo!.slide.map((obj) => {
        if (obj.selected && obj.type === SlideObjectType.Text) {
          obj.fontFamily = action.payload.font ?? obj.fontFamily
          obj.fontSize = action.payload.size ?? obj.fontSize
          obj.italic = action.payload.italic ? !obj.italic : obj.italic
          obj.bold = action.payload.bold ? !obj.bold : obj.bold
          obj.underline = action.payload.underline ? !obj.underline : obj.underline
        }
        return obj
      })
    })
    .addCase(updateColor, (state, action) => {
      const index = state.slides.findIndex(
        (slide) => slide.id == action.payload.slideId,
      )
      const slideInfo = state.slides[index]
      slideInfo.slide.forEach((obj) => {
        if (obj.selected && obj.type != SlideObjectType.Image) {
          switch (obj.type) {
            case SlideObjectType.Text: {
              obj.color = action.payload.color
              break
            }
            case SlideObjectType.Primitive: {
              obj = obj as CircleObject | SquareObject | TriangleObject
              obj.color = action.payload.color
              break
            }
          }
        }
      })
    })
    .addCase(importImage, (state, action) => {
      const index = state.slides.findIndex(
        (slide) => slide.id == action.payload.slideId,
      )
      const slideInfo = state.slides[index]
      const image = objectGenerator.Generate(
        SlideObjectType.Image,
        undefined,
        action.payload.data,
      )

      if (image != undefined) {
        if (action.payload.width && action.payload.height) {
          image.size.width = action.payload.width
          image.size.height = action.payload.height
        }
        
        slideInfo.slide.push(image)
      }
    })
    .addCase(updateBackground, (state, action) => {
      const index = state.slides.findIndex(
        (slide) => slide.id == action.payload.slideId,
      )
      state.slides[index].background = action.payload.data
    })
})

export default presentationReducer
