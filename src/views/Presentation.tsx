import styles from './Presentation.module.css'
import MenuBar from '../components/UI/MenuBar'
import LeftBar from '../components/UI/LeftBar'
import SlideEditor from '../components/Slide/SlideEditor'
import { useInterfaceActions } from '../hooks/redux';
import { useEffect, useState} from 'react';
import keyHandler from '../utils/KeyHandler';

function Presentation() {
  const {setDragObjects, setDragSlides} = useInterfaceActions();
  const [activeSlideId, setActiveSlideId] = useState<string|undefined>(undefined)

  useEffect(() => {
    window.onmouseup = () => {
      setDragObjects(false);
      setDragSlides(false);
    }
  }, []);

  keyHandler();

  return (
    <div className={styles.presentation}>
      <MenuBar activeSlideId={activeSlideId}/>

      <div className={styles.mainBlock}>
        <LeftBar onSetActiveSlide={setActiveSlideId}/>
        <SlideEditor/>
      </div>
    </div>
  )
}
 
export default Presentation
