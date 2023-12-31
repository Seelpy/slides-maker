import { useState } from "react"
import {
  useAppSelector,
  useHistoryActions,
  useInterfaceActions,
  usePresentationActions,
} from "../hooks/redux"
import { HistoryOperation, SlideInfo, SlideObject } from "../models/types"
import { v4 as uuidv4 } from "uuid"
import useHotkey from "../hooks/useHotkey"

function KeyHandler() {
  const slides = useAppSelector((state) => state.presentationReducer.slides)
  const [copiedObjects, setCopiedObjects] = useState<
    SlideInfo[] | SlideObject[]
  >([])

  const currentHistoryIndex = useAppSelector(
    (state) => state.historyReducer.currentIndex,
  )
  const history = useAppSelector((state) => state.historyReducer.history)
  const activeSlideId = useAppSelector(
    (state) => state.interfaceReducer.activeSlideId,
  )

  const activeSlide = slides.find((s) => s.id === activeSlideId)

  const { deleteSlides, updateSlide, updatePresentation, createSlide } =
    usePresentationActions()
  const { moveCurrentIndex, setLastOperationType, setShouldSaveState } =
    useHistoryActions()
  const { setActiveSlideId } = useInterfaceActions()

  const handleDeleteKey = () => {
    const selectedSlides = slides.filter((s) => s.selected)

    // Удаляем выделенные слайды. Если активный слайд - выделенный, то меняем активный на следующий.
    if (selectedSlides.length > 0) {
      const activeSlideIndex = activeSlideId
        ? selectedSlides.findIndex((s) => s.id === activeSlideId)
        : -1

      searchNextActive: {
        if (activeSlideIndex !== -1) {
          for (let i = activeSlideIndex + 1; i < slides.length; i++) {
            if (!slides[i].selected) {
              setActiveSlideId(slides[i].id)
              break searchNextActive
            }
          }
        }

        setActiveSlideId(undefined)
      }

      deleteSlides(selectedSlides)
    }

    // Удаляем выделенные объекты, если есть активный слайд.
    if (activeSlide) {
      const selectedObjects = activeSlide.slide.filter((obj) => obj.selected)
      selectedObjects.map((obj) =>
        updateSlide({ slideId: activeSlide.id, oldSlideObject: obj }),
      )
    }
  }

  const moveHistory = (by: number) => {
    if (
      (by === -1 && currentHistoryIndex > 2) ||
      (by === 1 && currentHistoryIndex + 1 < history.length)
    ) {
      moveCurrentIndex(by)
      updatePresentation(history[currentHistoryIndex + by].presentation)
      setActiveSlideId(history[currentHistoryIndex + by].activeSlideId)
      setLastOperationType(
        by === 1 ? HistoryOperation.forward : HistoryOperation.backward,
      )
    }
  }

  const copyObjects = () => {
    const selectedSlides = slides.filter((s) => s.selected)
    if (selectedSlides.length > 0) {
      setCopiedObjects(selectedSlides)
    } else if (activeSlide) {
      const selectedObjects = activeSlide.slide.filter((obj) => obj.selected)
      setCopiedObjects(selectedObjects)
    }
  }

  const moveActiveSlideIndex = (move: number) => {
    const newActiveSlideIndex = slides.findIndex((s) => s.id == activeSlideId) + move
    if (newActiveSlideIndex >= 0 && newActiveSlideIndex < slides.length ) {
      setActiveSlideId(slides[newActiveSlideIndex].id)
    }
  }

  const pasteObjects = () => {
    if (copiedObjects.length === 0) return

    if ("slide" in copiedObjects[0]) {
      const copiedSlides = copiedObjects as SlideInfo[]
      copiedSlides.map((slide) =>
        createSlide({
          ...slide,
          id: uuidv4(),
          selected: false,
          slide: slide.slide.map((obj) => ({ ...obj, id: uuidv4() })),
        }),
      )
    } else {
      copiedObjects.map((obj) =>
        updateSlide({
          slideId: activeSlide!.id,
          newSlideObject: {
            ...obj,
            id: uuidv4(),
            selected: false,
          } as SlideObject,
        }),
      )
    }
  }

  const selectAll = () => {
    if (slides.length === 0) return
    setShouldSaveState(false)

    const selectedSlides = slides.filter((s) => s.selected)
    if (selectedSlides.length > 0 || !activeSlide) {
      slides.map((s) => updateSlide({ slideId: s.id, selected: true }))
    } else {
      activeSlide.slide.map((obj) =>
        updateSlide({
          slideId: activeSlideId!,
          oldSlideObject: obj,
          newSlideObject: { ...obj, selected: true },
        }),
      )
    }
  }

  useHotkey(["Delete"], () => handleDeleteKey())
  useHotkey(["Ctrl+A", "Ctrl+Ф"], () => selectAll())
  useHotkey(["Ctrl+C", "Ctrl+С"], () => copyObjects())
  useHotkey(["Ctrl+V", "Ctrl+М"], () => pasteObjects())
  useHotkey(["Ctrl+Z", "Ctrl+Я"], () => moveHistory(-1))
  useHotkey(["Ctrl+Y", "Ctrl+Н", "Ctrl+Shift+Z", "Ctrl+Shift+Я"], () =>
    moveHistory(1),
  )
  useHotkey(["ArrowLeft", "ArrowUp"], () => moveActiveSlideIndex(-1))
  useHotkey(["ArrowRight", "ArrowDown"], () => moveActiveSlideIndex(1))
}

export default KeyHandler
