import styles from './Presentation.module.css'
import MenuBar from '../components/UI/MenuBar'
import LeftBar from '../components/UI/LeftBar'
import SlideEditor from '../components/Slide/SlideEditor'
import { useInterfaceActions } from '../hooks/redux';
import { useEffect, useState } from 'react';

function Presentation() {
  const {setDragObjects, setDragSlides} = useInterfaceActions();
  const [activeSlideId, setActiveSlideId] = useState<string|undefined>(undefined)

  useEffect(() => {
    window.onmouseup = () => {
      setDragObjects(false);
      setDragSlides(false);
    }
  }, []);

  const onSetActiveSlide = (slideId: string) => {
    console.log(slideId)
    setActiveSlideId(slideId)
  }

  return (
    <div className={styles.presentation}>
      <MenuBar activeSlideId={activeSlideId}/>

      <div className={styles.mainBlock}>
        <LeftBar onSetActiveSlide={onSetActiveSlide}/>
        <SlideEditor/>
      </div>
    </div>
  )
}
 
export default Presentation
