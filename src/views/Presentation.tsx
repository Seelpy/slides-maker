import styles from "./Presentation.module.css"
import MenuBar from "../components/UI/MenuBar"
import LeftBar from "../components/UI/LeftBar"
import SlideEditor from "../components/Slide/SlideEditor"
import KeyHandler from "../utils/KeyHandler"
import TextKeyHandler from "../utils/TextKeyHandler"
import { useEffect } from "react"
import {
  useAppSelector,
  useHistoryActions,
  useInterfaceActions,
} from "../hooks/redux"

function Presentation() {
  const presentation = useAppSelector((state) => state.presentationReducer)
  const { activeSlideId, isDraggingObjects } = useAppSelector(
    (state) => state.interfaceReducer,
  )
  const { history, lastHistoryOperation, currentIndex, shouldSaveState } =
    useAppSelector((state) => state.historyReducer)
  const {
    pushHistoryState,
    clearHistoryAfterIndex,
    setLastOperationType,
    setShouldSaveState,
  } = useHistoryActions()
  const { setDragObjects, setDragSlides, setSelectingArea } =
    useInterfaceActions()

  useEffect(() => {
    window.onmouseup = () => {
      setDragObjects(false)
      setDragSlides(false)
      setSelectingArea(false)
    }
    window.oncontextmenu = (event) => event.preventDefault()
  }, [])

  useEffect(() => {
    if (lastHistoryOperation === undefined && !isDraggingObjects) {
      if (currentIndex !== history.length - 1) {
        clearHistoryAfterIndex()
      }

      if (shouldSaveState) {
        pushHistoryState({
          presentation: presentation,
          activeSlideId: activeSlideId,
        })
        localStorage.setItem("lastPresentation", JSON.stringify(presentation))
      } else {
        setShouldSaveState(true)
      }
    } else if (lastHistoryOperation !== undefined) {
      setLastOperationType(undefined)
      localStorage.setItem("lastPresentation", JSON.stringify(presentation))
    }
  }, [presentation, activeSlideId, isDraggingObjects])

  KeyHandler()
  TextKeyHandler()

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
