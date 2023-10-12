import styles from './LeftBar.module.css'
import { Slide } from '../models/types';
import SlidePreview from './SlidePreview';

type LeftBarProps = {
  slides: Slide[]
};


const LeftBar = (props: LeftBarProps) => {
  return (
    <div className={styles.leftBar}>
      {
       props.slides.map(function (slide) {
        return <div className={styles.miniSlide}>
          <SlidePreview objects={slide}></SlidePreview>
        </div>
       })
      }
    </div>
  )
}

export default LeftBar
