import styles from './Presentation.module.css'
import MenuBar from '../components/UI/MenuBar'
import LeftBar from '../components/UI/LeftBar'
import SlideEditor from '../components/Slide/SlideEditor'
import { presentationInfo } from '../models/example/high';
import { useState } from 'react';

function Presentation() {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  return (
    <div className={styles.presentation}>
      <MenuBar name={presentationInfo.name}/>
      
      <div className={styles.mainBlock}>
        <LeftBar slides={presentationInfo.presenation} activeSlideIndex={activeSlideIndex} setActiveSlideIndex={setActiveSlideIndex}/>
        <SlideEditor slideInfo={presentationInfo.presenation[activeSlideIndex]}></SlideEditor>
      </div>
    </div>
  )
}

export default Presentation
