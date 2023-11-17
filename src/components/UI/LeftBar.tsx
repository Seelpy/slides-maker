import styles from './LeftBar.module.css'
import SlidePreview from '../Slide/SlidePreview'
import SlidesMoveHandler from '../../utils/SlidesMoveHandler'
import {
  useAppSelector,
  useInterfaceActions,
  usePresentationActions,
} from '../../hooks/redux'
import { useRef } from 'react'
import { SlideInfo } from '../../models/types'

const LeftBar = () => {
  const slides = useAppSelector((state) => state.presentationReducer.slides)
  const leftBarRef = useRef<HTMLDivElement | null>(null)
  const { activeSlideId, dragSlidesDelta } = useAppSelector(
    (state) => state.interfaceReducer,
  )
  const { setDragSlides, setActiveSlideId } = useInterfaceActions()
  const { updateSlide } = usePresentationActions()

  SlidesMoveHandler()

  const handleSlideClick = (event: React.MouseEvent, slide: SlideInfo) => {
    if (dragSlidesDelta === 0) {
      if (event.ctrlKey) {
        updateSlide({ slide: slide, selected: !slide.selected })
      }
      else if (event.shiftKey) {
        let firstSelectedIndex = -1;
        const clickedIndex = slides.findIndex((s) => s.id === slide.id);
        updateSlide({ slide: slide, selected: true });

        for (let i = 0; i < slides.length; i++) {
          if (slides[i].selected) {
            firstSelectedIndex = i;
            break;
          }
        }

        if (firstSelectedIndex >= 0 && clickedIndex !== firstSelectedIndex) {
          for (let i = firstSelectedIndex; i != clickedIndex; firstSelectedIndex > clickedIndex ? i-- : i++ )
            updateSlide({ slide: slides[i], selected: true })
        }
      }
      else {
        setActiveSlideId(slide.id)
        slides.map((s) => updateSlide({ slide: s, selected: false }))
      }
    }
  }

  return (
    <div
      className={styles.leftBar}
      ref={leftBarRef}
      onMouseLeave={() => setDragSlides(false)}
    >
      {slides.map((slideInfo, i) => (
        <SlidePreview
          key={i}
          active={activeSlideId !== undefined && slideInfo.id === activeSlideId}
          selected={slideInfo.selected}
          slideInfo={slideInfo}
          onClick={(event: React.MouseEvent, slide: SlideInfo) =>
            handleSlideClick(event, slide)
          }
        />
      ))}
    </div>
  )
}

export default LeftBar
