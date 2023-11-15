import styles from './SlidePreview.module.css'
import EditorObject from './SlideObject';
import { SlideInfo } from '../../models/types';
import { useRef } from 'react';
import { useInterfaceActions } from '../../hooks/redux';
import useDragSlide from '../../hooks/useDragSlide';

type SlidePreviewProps = {
  active: boolean,
  selected: boolean,
  slideInfo: SlideInfo;
  setActiveSlideIndex: () => void;
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

const SlidePreview = (props: SlidePreviewProps) => {
  const slideRef = useRef<HTMLDivElement | null>(null);
  const {setDragSlides} = useInterfaceActions();
  useDragSlide(slideRef, props.slideInfo, setDragSlides);

  return (
    <div ref={slideRef} data-selected={props.selected ? `true` : `false`} onClick={props.setActiveSlideIndex} className={styles.miniSlide + getCorrectBorder(props.active, props.selected)}>
      <div className={styles.slidePreview}>
        {props.slideInfo.slide.map((obj, i) => (
          <EditorObject key={i} slide={props.slideInfo} data={obj} preview={true}/>
        ))}
      </div>
    </div>
  )
}

export default SlidePreview
