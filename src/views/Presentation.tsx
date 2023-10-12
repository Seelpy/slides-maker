import styles from './Presentation.module.css'
import MenuBar from '../components/MenuBar'
import LeftBar from '../components/LeftBar'
import SlideEditor from '../components/SlideEditor'

function Presentation() {
  return (
    <div className={styles.presentation}>
      <MenuBar />
      
      <div className={styles.mainBlock}>
        <LeftBar />
        <SlideEditor />
      </div>
    </div>
  )
}

export default Presentation
