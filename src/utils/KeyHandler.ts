import { useEffect } from 'react'
import {
  useAppSelector,
  useHistoryActions,
  useInterfaceActions,
  usePresentationActions,
} from '../hooks/redux'
import { HistoryOperation } from '../models/types'

function keyHandler() {
  const presentation = useAppSelector((state) => state.presentationReducer)
  const slides = useAppSelector((state) => state.presentationReducer.slides)

  const currentHistoryIndex = useAppSelector((state) => state.historyReducer.currentIndex)
  const history = useAppSelector((state) => state.historyReducer.history)
  const activeSlideId = useAppSelector(
    (state) => state.interfaceReducer.activeSlideId,
  )

  const activeSlide = slides.find((s) => s.id === activeSlideId)

  const { deleteSlides, updateSlide, updatePresentation } = usePresentationActions()
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
      }
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown)

    return () => {
      document.removeEventListener("keydown", onKeyDown)
    }
  }, [presentation, activeSlide, currentHistoryIndex])
}

export default keyHandler
