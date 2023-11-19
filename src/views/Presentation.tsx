import styles from './Presentation.module.css'
import MenuBar from '../components/UI/MenuBar'
import LeftBar from '../components/UI/LeftBar'
import SlideEditor from '../components/Slide/SlideEditor'
import keyHandler from '../utils/KeyHandler'
import textKeyHandler from '../utils/TextKeyHandler'
import { useEffect } from 'react'
import { useAppSelector, useHistoryActions, useInterfaceActions } from '../hooks/redux'

function Presentation() {
  const presentation = useAppSelector((state) => state.presentationReducer)
  const { activeSlideId, isDraggingObjects } = useAppSelector((state) => state.interfaceReducer)
  const { history, lastHistoryOperation, currentIndex } = useAppSelector((state) => state.historyReducer)
  const { pushHistoryState, clearHistoryAfterIndex, setLastOperationType } = useHistoryActions()
  const { setDragObjects, setDragSlides, setSelectingArea } = useInterfaceActions()

  useEffect(() => {
    window.onmouseup = () => {
      setDragObjects(false)
      setDragSlides(false)
      setSelectingArea(false)
    }
  }, [])

  useEffect(() => {
    if (lastHistoryOperation === undefined && !isDraggingObjects) {
      if (currentIndex !== history.length - 1) {
        clearHistoryAfterIndex()
      }

      pushHistoryState({presentation: presentation, activeSlideId: activeSlideId})
    }

    setLastOperationType(undefined)
  }, [presentation, activeSlideId, isDraggingObjects])

  keyHandler()
  textKeyHandler()

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
