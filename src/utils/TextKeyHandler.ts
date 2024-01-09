import useHotkey from "../hooks/useHotkey"
import { useAppSelector } from "../hooks/redux"
import { SlideObjectType, TextObject } from "../models/types"
import { usePresentationActions } from "../hooks/redux"

function TextKeyHandler() {
  const slides = useAppSelector((state) => state.presentationReducer.slides)

  const { updateSlide } = usePresentationActions()

  const activeSlideId = useAppSelector(
    (state) => state.interfaceReducer.activeSlideId,
  )

  const activeSlide = slides.find((s) => s.id === activeSlideId)

  const selectedText =
    activeSlide?.slide.filter(
      (obj) => obj.selected && obj.type === SlideObjectType.Text,
    ) as TextObject[] ?? []

  const handleOnDelete = () => {
    if (activeSlide) {
      selectedText.map((text) => {
        updateSlide({
          slideId: activeSlide.id,
          oldSlideObject: text,
          newSlideObject: {
            ...text,
            value: text.value.slice(0, -1)
          },
        })
      })
    }
  }

  const handleOnCtrlDelete = () => {
    if (activeSlide) {
      selectedText.map((text) => {
        const words = text.value.split("\u00A0")
        words.pop()
        updateSlide({
          slideId: activeSlide.id,
          oldSlideObject: text,
          newSlideObject: {
            ...text,
            value: words.join("\u00A0")
          },
        })
      })
    }
  }

  const handleKey = (key: string) => {
    if (activeSlide) {
      selectedText.map((text) => {
        updateSlide({
          slideId: activeSlide.id,
          oldSlideObject: text,
          newSlideObject: {
            ...text,
            value: text.value + key
          },
        })
      })
    }
  }

  const mapKeyToFunc = (event: KeyboardEvent) => {
    switch (event.key) {
      case "Backspace": {
        if (event.ctrlKey) {
          handleOnCtrlDelete()
        } else {
          handleOnDelete()
        }
        break
      }
      case "Enter": {
        handleKey("\n")
        break
      }
      case " ": {
        handleKey("\u00A0")
        break
      }
      default: {
        if (event.key.length === 1 && !event.ctrlKey) {
          handleKey(event.key)
        }
      }
    }
  }

  useHotkey(["*"], (e) => mapKeyToFunc(e))
}

export default TextKeyHandler
