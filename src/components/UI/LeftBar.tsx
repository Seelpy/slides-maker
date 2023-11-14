import styles from './LeftBar.module.css'
import SlidePreview from '../Slide/SlidePreview';
import { useAppSelector, useInterfaceActions } from '../../hooks/redux';

const LeftBar = () => {
  const slides = useAppSelector(state => state.presentationReducer.slides);
  const activeSlideIndex = useAppSelector(state => state.interfaceReducer.activeSlideIndex);
  const {setDragSlides, setActiveSlideIndex} = useInterfaceActions();
  
  return (
    <div className={styles.leftBar} onMouseLeave={() => setDragSlides(false)}>
      {slides.map((slideInfo, i) => (
        <SlidePreview 
          key={i} 
          active={i === activeSlideIndex} 
          selected={slideInfo.selected} 
          slideInfo={slideInfo}
          setActiveSlideIndex={() => setActiveSlideIndex(i)}
        />
       ))
      }
    </div>
  )
}

export default LeftBar
