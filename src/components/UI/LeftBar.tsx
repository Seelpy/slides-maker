import styles from './LeftBar.module.css'
import SlidePreview from '../Slide/SlidePreview';
import SlidesMoveHandler from '../../utils/SlidesMoveHandler';
import { useAppSelector, useInterfaceActions, usePresentationActions } from '../../hooks/redux';
import { useRef } from "react";
import { SlideInfo } from '../../models/types';

type LeftBarProps = {
  onSetActiveSlide: (slideId: string) => void,
}

const LeftBar = (props: LeftBarProps) => {
  const slides = useAppSelector(state => state.presentationReducer.slides);
  const leftBarRef = useRef<HTMLDivElement | null>(null);
  const {activeSlide, dragSlidesDelta} = useAppSelector(state => state.interfaceReducer);
  const {setDragSlides, setActiveSlide} = useInterfaceActions();
  const {updateSlide} = usePresentationActions();

  SlidesMoveHandler();

  const unselectSlides = (event: React.MouseEvent) => {
    if (event.target === leftBarRef.current) {
     slides.map(s => updateSlide({slide: s, selected: false}));
    }
  }

  const handleSlideClick = (event: React.MouseEvent, slide: SlideInfo) => {
    if (dragSlidesDelta === 0) {
      if (!event.ctrlKey) {
        setActiveSlide(slide);
        props.onSetActiveSlide(slide.id)
        slides.map(s => updateSlide({slide: s, selected: false}));
        updateSlide({slide: slide, selected: true});
      }
      else {
        updateSlide({slide: slide, selected: !slide.selected});
      }
    }
  }

  return (
    <div className={styles.leftBar} ref={leftBarRef} onMouseLeave={() => setDragSlides(false)} onClick={(e) => unselectSlides(e)}>
      {slides.map((slideInfo, i) => (
        <SlidePreview 
          key={i} 
          active={activeSlide !== undefined && slideInfo.id === activeSlide.id} 
          selected={slideInfo.selected} 
          slideInfo={slideInfo}
          onClick={(event: React.MouseEvent, slide: SlideInfo) => handleSlideClick(event, slide)}
        />
       ))
      }
    </div>
  )
}

export default LeftBar
