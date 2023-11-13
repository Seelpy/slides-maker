import styles from './LeftBar.module.css'
import { SlideInfo } from '../../models/types';
import SlidePreview from '../Slide/SlidePreview';

type LeftBarProps = {
  slides: SlideInfo[];
  activeSlideIndex: number;
  setActiveIndexSlide: (i: number) => void;
};


function getCorrectBorder(active: boolean, selected: boolean) {
  if (active && selected) {
    return ` ${styles.activeAndSelectedSlide}`
  }

  if (selected) {
    return ` ${styles.selectedSlide}`
  }

  if (active) {
    return ` ${styles.activeSlide}`
  }

  return ``
}

const LeftBar = (props: LeftBarProps) => {
  return (
    <div className={styles.leftBar}>
      {
       props.slides.map((slideInfo, i) => (
        <div key={i}
          className={styles.miniSlide + getCorrectBorder(i === props.activeSlideIndex, slideInfo.selected)} 
          onClick={() => props.setActiveIndexSlide(i)}>
          <SlidePreview selected={slideInfo.selected} slide={slideInfo.slide}/>
        </div>
       ))
      }
    </div>
  )
}

export default LeftBar
