import { useAppSelector } from '../hooks/redux'
import { SlideObjectType, TextObject } from '../models/types'
import { usePresentationActions } from '../hooks/redux'
import { Char } from '../models/types'

function textKeyHandler() {
  const slides = useAppSelector((state) => state.presentationReducer.slides)

  const { updateSlide } = usePresentationActions()

  const activeSlideId = useAppSelector(
    (state) => state.interfaceReducer.activeSlideId,
  )

  let activeSlide = slides.find((s) => s.id === activeSlideId)


  const selectedText = activeSlide?.slide.filter((obj) => obj.selected && obj.type === SlideObjectType.Text) ?? []

  const handleOnDelete = () => {
    if (activeSlide) {
      selectedText.map((text) => {
        const tmpText = structuredClone(text) as TextObject
        tmpText.chars.pop()
        if (activeSlide) {
          updateSlide({ slide  : activeSlide, oldSlideObject: text, newSlideObject: tmpText})
        }
      })
    }
  } 

  const handleKey = (key: string) => {
    if (activeSlide) {
      selectedText.map((text) => {
        const tmpText = structuredClone(text) as TextObject
        let tmpChar: Char = {
          value: key,
          fontFamily: "Arial",
          fontSize: 14,
          color: "black",
          bold: false,
          italic: false,
          underline: false
        }
        if (tmpText.chars.length > 0) {
          tmpChar = structuredClone(tmpText.chars[0])
          tmpChar.value = key
        }

        tmpText.chars.push(tmpChar)
        if (activeSlide) {
          updateSlide({ slide  : activeSlide, oldSlideObject: text, newSlideObject: tmpText})
        }
      })
    }
  } 

  window.onkeydown = (event: KeyboardEvent) => {
    switch (event.key) {
      case 'Delete': {
        handleOnDelete()
        break
      }
      case 'Backspace': {
        handleOnDelete()
        break
      }
      case 'Tab': {
        handleKey('\t')
        break
      }
      case 'Enter': {
        handleKey('\n')
        break
      }
      case 'Shift': {
        break
      }
      case 'Alt': {
        break
      }
      case " ": {
        handleKey("ㅤ")
        break
      }
      default : {
        handleKey(event.key)
      }
    }
  }
}

export default textKeyHandler
