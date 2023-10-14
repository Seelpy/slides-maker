import styles from './LeftBar.module.css'
import { Slide } from '../../models/types';
import SlidePreview from '../Slide/SlidePreview';

type LeftBarProps = {
  slides: Slide[];
  activeSlideIndex: number;
  setActiveSlideIndex: (i: number) => void;
};


const LeftBar = (props: LeftBarProps) => {
  return (
    <div className={styles.leftBar}>
      {
       props.slides.map((slide, i) => (
        <div key={i}
          className={styles.miniSlide + (i === props.activeSlideIndex ? ` ${styles.activeSlide}` : ``)} 
          onClick={() => props.setActiveSlideIndex(i)}>
          <SlidePreview objects={slide} />
        </div>
       ))
      }
    </div>
  )
}

export default LeftBar
