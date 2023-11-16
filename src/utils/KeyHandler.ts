import { useEffect } from "react";
import { useAppSelector, useInterfaceActions, usePresentationActions } from "../hooks/redux";

function keyHandler() {
  const slides = useAppSelector(state => state.presentationReducer.slides);
  const activeSlide = useAppSelector(state => state.interfaceReducer.activeSlide);
  const {setActiveSlide} = useInterfaceActions();
  const {deleteSlides, updateSlide} = usePresentationActions();

  const handleDeleteKey = () => {
    const selectedSlides = slides.filter(s => s.selected);

    // Удаляем выделенные слайды. Если активный слайд - выделенный, то меняем активный на следующий.
    if (selectedSlides.length > 0) {
      const activeSlideIndex = activeSlide ? selectedSlides.findIndex(s => s.id === activeSlide!.id) : -1;
  
      if (activeSlideIndex !== -1) {
        for (let i = activeSlideIndex + 1; i < slides.length; i++) {
          if (!slides[i].selected) {
            setActiveSlide(slides[i]);
            break;
          }
        }
      }
  
      deleteSlides(selectedSlides); 
    }
  
    // Удаляем выделенные объекты, если есть активный слайд.
    if (activeSlide) {
      const selectedObjects = activeSlide.slide.filter(obj => obj.selected);
      for (let i = 0; i < selectedObjects.length; i++) {
        updateSlide({slide: activeSlide, oldSlideObject: selectedObjects[i]});
      }
    }
  }

  useEffect(() => {
    window.onkeyup = (event: KeyboardEvent) => {
      switch (event.key) {
        case "Delete": {
          handleDeleteKey();
          break;
        }
      }
    }
  }, [slides, activeSlide]);
}

export default keyHandler