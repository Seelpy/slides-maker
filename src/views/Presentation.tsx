import styles from './Presentation.module.css'
import MenuBar from '../components/UI/MenuBar'
import LeftBar from '../components/UI/LeftBar'
import SlideEditor from '../components/Slide/SlideEditor'
import { useInterfaceActions } from '../hooks/redux'
import { useEffect } from 'react'
import keyHandler from '../utils/KeyHandler'

function Presentation() {
  const { setDragObjects, setDragSlides, setSelectingArea } = useInterfaceActions()

  useEffect(() => {
    window.onmouseup = () => {
      setDragObjects(false)
      setDragSlides(false)
      setSelectingArea(false)
    }
  }, [])

  keyHandler()

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
