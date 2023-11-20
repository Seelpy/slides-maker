import { useEffect, useState } from 'react'
import {
  useAppSelector,
  useHistoryActions,
  useInterfaceActions,
  usePresentationActions,
} from '../hooks/redux'
import { HistoryOperation, SlideInfo, SlideObject } from '../models/types'
import { v4 as uuidv4 } from 'uuid';

function keyHandler() {
  const presentation = useAppSelector((state) => state.presentationReducer)
  const slides = useAppSelector((state) => state.presentationReducer.slides)
  const [copiedObjects, setCopiedObjects] = useState<SlideInfo[] | SlideObject[]>([])

  const currentHistoryIndex = useAppSelector((state) => state.historyReducer.currentIndex)
  const history = useAppSelector((state) => state.historyReducer.history)
  const activeSlideId = useAppSelector(
    (state) => state.interfaceReducer.activeSlideId,
  )

  const activeSlide = slides.find((s) => s.id === activeSlideId)

  const { deleteSlides, updateSlide, updatePresentation, createSlide } = usePresentationActions()
  const { moveCurrentIndex, setLastOperationType } = useHistoryActions();
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
        updateSlide({ slide: activeSlide, oldSlideObject: obj }),
      )
    }
  }

  const moveHistory = (by: number) => {
    if (by === -1 && currentHistoryIndex > 3
      || by === 1 && currentHistoryIndex + 1 < history.length)
    {
      moveCurrentIndex(by)
      updatePresentation(history[currentHistoryIndex + by].presentation)
      setActiveSlideId(history[currentHistoryIndex + by].activeSlideId)
      setLastOperationType(by === 1 ? HistoryOperation.forward : HistoryOperation.backward)
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

  const pasteObjects = () => {
    if (copiedObjects.length === 0) return;

    if ("slide" in copiedObjects[0]) {
      const copiedSlides = copiedObjects as SlideInfo[]
      copiedSlides.map((slide) => createSlide({
        ...slide, 
        id: uuidv4(),
        selected: false,
        slide:slide.slide.map((obj) => ({...obj, id: uuidv4()})), 
      }))
    } else {
      copiedObjects.map((obj) => updateSlide({
          slide: activeSlide!,
          newSlideObject: {...obj, id: uuidv4(), selected: false} as SlideObject
      }))
    }
  }

  const onKeyDown = (event: KeyboardEvent) => {
    switch (event.key.toLowerCase()) {
      case 'delete': {
        handleDeleteKey()
        break
      }
      case 'z': {
        if (event.ctrlKey) {
          if (event.shiftKey) {
            moveHistory(1)
          } else {
            moveHistory(-1)
          }
        }
        break
      }
      case 'y': {
        if (event.ctrlKey) {
          moveHistory(1)
        }
        break
      }
      case 'c': {
        if (event.ctrlKey) {
          copyObjects()
        }
        break
      }
      case 'v': {
        if (event.ctrlKey) {
          pasteObjects()
        }
        break
      }
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown)

    return () => {
      document.removeEventListener("keydown", onKeyDown)
    }
  }, [presentation, activeSlide, currentHistoryIndex, copiedObjects])
}

export default keyHandler
