import { useEffect } from 'react'
import { useAppSelector, usePresentationActions } from '../hooks/redux'

function SlidesMoveHandler() {
  const { isDraggingSlides, dragSlidesOrigin, dragSlidesDelta } =
    useAppSelector((state) => state.interfaceReducer)
  const slides = useAppSelector((state) => state.presentationReducer.slides)
  const { moveSlides } = usePresentationActions()

  useEffect(() => {
    if (!isDraggingSlides && dragSlidesOrigin && dragSlidesDelta !== 0) {
      // Получаем нужные данные, для будущего свапа слайдов
      const selectedSlides = slides.filter((s) => s.selected)
      const slidesPassed = Math.round(dragSlidesDelta / 228.0)
      const originIndex = slides.findIndex((s) => s.id === dragSlidesOrigin!.id)

      // Клэмпим значение, на сколько слайдов будет сдвиг
      const minMove = -originIndex
      const maxMove = slides.length - originIndex
      const moveBy = Math.min(Math.max(slidesPassed, minMove), maxMove)
      let shouldMove = false

      // Смотрим, нужно ли сгруппировать слайды (если у нас выделено несколько слайдов, идущих подряд)
      for (let i = 0; i < selectedSlides.length; i++) {
        for (let j = i + 1; j < selectedSlides.length; j++) {
          if (
            Math.abs(
              slides.findIndex((s) => s.id === selectedSlides[i].id) -
                slides.findIndex((s) => s.id === selectedSlides[j].id),
            ) > 1
          ) {
            shouldMove = true
            break
          }
        }
        if (shouldMove) break
      }

      if (moveBy !== 0 || shouldMove) {
        moveSlides({ slides: selectedSlides, pasteIndex: originIndex + moveBy })
      }
    }
  }, [isDraggingSlides])
}

export default SlidesMoveHandler
