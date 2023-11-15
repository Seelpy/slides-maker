import styles from './LeftBar.module.css'
import SlidePreview from '../Slide/SlidePreview';
import { useAppSelector, useInterfaceActions } from '../../hooks/redux';
import { SlideInfo } from '../../models/types';

const LeftBar = () => {
  const slides = useAppSelector(state => state.presentationReducer.slides);
  const {activeSlide, didMoveSlides} = useAppSelector(state => state.interfaceReducer);
  const {setDragSlides, setActiveSlide, setMovedSlides} = useInterfaceActions();
  
  const updateActiveSlide = (slide: SlideInfo) => {
    if (!didMoveSlides) {
      setActiveSlide(slide);
    }

    setMovedSlides(false);
  }

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
