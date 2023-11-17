import styles from './SlideEditor.module.css'
import EditorObject from './SlideObject'
import SelectionAreaHandler from '../../utils/SelectionAreaHandler'
import { useAppSelector } from '../../hooks/redux'
import { useInterfaceActions } from '../../hooks/redux'
import { useRef } from 'react'

const SlideEditor = () => {
  const editorAreaRef = useRef<HTMLDivElement | null>(null)
  const slideEditorRef = useRef<HTMLDivElement | null>(null)
  const selectionRef = useRef<HTMLDivElement | null>(null)

  const activeSlideId = useAppSelector((state) => state.interfaceReducer.activeSlideId)
  const slides = useAppSelector((state) => state.presentationReducer.slides)
  const referencedActiveSlide = slides.find((s) => s.id === activeSlideId)
  const { setDragObjects, setSelectingArea } = useInterfaceActions()

  SelectionAreaHandler(referencedActiveSlide, editorAreaRef, slideEditorRef, selectionRef);

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
      {referencedActiveSlide && 
        <div className={styles.slideEditor} ref={slideEditorRef} onDragStart={(e) => dropDragEvent(e)}>
          <div ref={selectionRef} className={styles.selectionArea}/>
          {referencedActiveSlide.slide.map((obj, i) => (
            <EditorObject
              key={i}
              slide={referencedActiveSlide}
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
