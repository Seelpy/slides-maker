import styles from './SlideEditor.module.css'
import EditorObject from './SlideObject'
import useSelectObjects from '../../hooks/useSelectObjects'
import useDragObjects from '../../hooks/useDragObjects'
import { useAppSelector } from '../../hooks/redux'
import { useInterfaceActions } from '../../hooks/redux'
import { useRef } from 'react'
import textKeyHandler from '../../utils/TextKeyHandler'

const SlideEditor = () => {
  const editorAreaRef = useRef<HTMLDivElement | null>(null)
  const slideEditorRef = useRef<HTMLDivElement | null>(null)
  const mouseSelectionRef = useRef<HTMLDivElement | null>(null)

  const activeSlideId = useAppSelector((state) => state.interfaceReducer.activeSlideId)
  const slides = useAppSelector((state) => state.presentationReducer.slides)
  const activeSlide = slides.find((s) => s.id === activeSlideId)
  const { setDragObjects, setSelectingArea } = useInterfaceActions()

  useSelectObjects(activeSlide, editorAreaRef, slideEditorRef, mouseSelectionRef);
  useDragObjects(editorAreaRef, activeSlide)
  textKeyHandler()

  const dropDragEvent = (e: React.DragEvent) => {
    e.preventDefault();
  }

  return (
    <div
      className={styles.editorArea}
      ref={editorAreaRef}
      onMouseLeave={() => {setDragObjects(false); setSelectingArea(false)}}
      onDragStart={(e) => dropDragEvent(e)}
    >
      {activeSlide && 
        <div 
          className={styles.slideEditor} 
          ref={slideEditorRef} onDragStart={(e) => dropDragEvent(e)}
          style={{background: activeSlide.background}}
        >
          <div ref={mouseSelectionRef} className={styles.selectionArea}/>
          {activeSlide.slide.map((obj, i) => (
            <EditorObject
              key={i}
              slide={activeSlide}
              data={obj}
              preview={false}
            />
          ))}
        </div>
      }
    </div>
  )
}

export default SlideEditor
