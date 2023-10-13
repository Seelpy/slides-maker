import styles from './Presentation.module.css'
import MenuBar from '../components/MenuBar'
import LeftBar from '../components/LeftBar'
import SlideEditor from '../components/SlideEditor'
import { presentation } from '../models/example/high';
import { useState } from 'react';

function Presentation() {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  return (
    <div className={styles.presentation}>
      <MenuBar />
      
      <div className={styles.mainBlock}>
        <LeftBar slides={presentation} activeSlideIndex={activeSlideIndex} setActiveSlideIndex={setActiveSlideIndex}/>
        <SlideEditor objects={presentation[activeSlideIndex]}></SlideEditor>
      </div>
    </div>
  )
}

export default Presentation
