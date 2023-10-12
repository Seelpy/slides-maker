import styles from './Presentation.module.css'
import MenuBar from '../components/MenuBar'
import LeftBar from '../components/LeftBar'
import SlideEditor from '../components/SlideEditor'
import {presentation, slide1} from '../models/example/high';

function Presentation() {
  return (
    <div className={styles.presentation}>
      <MenuBar />
      
      <div className={styles.mainBlock}>
        <LeftBar slides={presentation}/>
        <SlideEditor objects={slide1}></SlideEditor>
      </div>
    </div>
  )
}

export default Presentation
