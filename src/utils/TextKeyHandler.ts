import { useAppSelector } from '../hooks/redux'
import { SlideObjectType, TextObject } from '../models/types'
import { usePresentationActions } from '../hooks/redux'

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
        tmpText.value = tmpText.value.slice(0, -1)
        updateSlide({ slide  : activeSlide!, oldSlideObject: text, newSlideObject: tmpText})
      })
    }
  } 

  const handleKey = (key: string) => {
    if (activeSlide) {
      selectedText.map((text) => {
        const tmpText = structuredClone(text) as TextObject
        tmpText.value += key
        updateSlide({ slide  : activeSlide!, oldSlideObject: text, newSlideObject: tmpText})
      })
    }
  }

  window.onkeydown = (event: KeyboardEvent) => {
    if (document.activeElement?.tagName === "INPUT") return;

    switch (event.key) {
      case 'Backspace': {
        handleOnDelete()
        break
      }
      case 'Enter': {
        handleKey('\n')
        break
      }
      case " ": {
        handleKey('\u00A0')
        break
      }
      default : {
        if (event.key.length === 1 && !event.ctrlKey) {
          handleKey(event.key)
        }
      }
    }
  }
}

export default textKeyHandler
