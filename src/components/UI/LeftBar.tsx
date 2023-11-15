import styles from './LeftBar.module.css'
import SlidePreview from '../Slide/SlidePreview';
import { useAppSelector, useInterfaceActions, usePresentationActions } from '../../hooks/redux';
import { SlideInfo } from '../../models/types';
import { useEffect } from "react";

const LeftBar = () => {
  const slides = useAppSelector(state => state.presentationReducer.slides);
  const {activeSlide, isDraggingSlides, dragSlidesOrigin, dragSlidesDelta} = useAppSelector(state => state.interfaceReducer);
  const {setDragSlides, setActiveSlide, setDragSlidesOrigin, setDragSlidesDelta} = useInterfaceActions();
  const {moveSlides} = usePresentationActions();
  
  const updateActiveSlide = (slide: SlideInfo) => {
    // dragSlidesOrigin нужен, чтобы после перетаскивания не срабатывал случайный клик
    if (dragSlidesOrigin === undefined) {
      setActiveSlide(slide);
    }
    else {
      setDragSlidesOrigin(undefined);
    }
  }

  useEffect(() => {
    if (!isDraggingSlides && dragSlidesOrigin && dragSlidesDelta !== 0) {
      // Получаем нужные данные, для будущего свапа слайдов
      const selectedSlides = slides.filter(s => s.selected);
      const slidesPassed = Math.round(dragSlidesDelta / 228.0);
      const originIndex = slides.findIndex(s => s.id === dragSlidesOrigin!.id);

      // Клэмпим значение, на сколько слайдов будет сдвиг
      const minMove = -originIndex;
      const maxMove = slides.length - originIndex;
      const moveBy = Math.min(Math.max(slidesPassed, minMove), maxMove);
      let shouldMove = false;

      // Смотрим, нужно ли двигать слайды (если у нас выделено несколько слайдов, они могут идти подряд и сдвиг не нужен)
      for (let i = 0; i < selectedSlides.length; i++) {
        for (let j = i + 1; j < selectedSlides.length; j++) {
          if (Math.abs(slides.findIndex(s => s.id === selectedSlides[i].id) - slides.findIndex(s => s.id === selectedSlides[j].id)) > 1) {
            shouldMove = true;
            break;
          }
        }
        if (shouldMove) break;
      }
  
      if (moveBy !== 0 || shouldMove) {
        moveSlides({slides: selectedSlides, pasteIndex: originIndex + moveBy});
      }
      else {
        setActiveSlide(dragSlidesOrigin);
      }

      setDragSlidesDelta(0);
    }
  }, [isDraggingSlides])

  return (
    <div className={styles.leftBar} onMouseLeave={() => setDragSlides(false)}>
      {slides.map((slideInfo, i) => (
        <SlidePreview 
          key={i} 
          active={activeSlide !== undefined && slideInfo.id === activeSlide.id} 
          selected={slideInfo.selected} 
          slideInfo={slideInfo}
          setActiveSlide={() => updateActiveSlide(slideInfo)}
        />
       ))
      }
    </div>
  )
}

export default LeftBar
