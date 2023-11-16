import styles from './SlideEditor.module.css'
import EditorObject from './SlideObject'
import { useAppSelector, usePresentationActions } from '../../hooks/redux'
import { useInterfaceActions } from '../../hooks/redux'
import { useRef } from 'react'

const SlideEditor = () => {
  const editorAreaRef = useRef<HTMLDivElement | null>(null)
  const slideEditorRef = useRef<HTMLDivElement | null>(null)
  const activeSlide = useAppSelector(
    (state) => state.interfaceReducer.activeSlide,
  )
  const slides = useAppSelector((state) => state.presentationReducer.slides)
  const { setDragObjects } = useInterfaceActions()
  const { updateSlide } = usePresentationActions()

  if (activeSlide === undefined) {
    return null
  }

  const referencedActiveSlide = slides.find((s) => s.id === activeSlide.id)

  const unselectObjects = (event: React.MouseEvent) => {
    if (
      event.target === editorAreaRef.current ||
      event.target === slideEditorRef.current
    ) {
      referencedActiveSlide!.slide.map((obj) =>
        updateSlide({
          slide: referencedActiveSlide!,
          oldSlideObject: obj,
          newSlideObject: { ...obj, selected: false },
        }),
      )
    }
  }

  return (
    <div
      className={styles.editorArea}
      ref={editorAreaRef}
      onMouseLeave={() => setDragObjects(false)}
      onClick={(e) => unselectObjects(e)}
    >
      <div className={styles.slideEditor} ref={slideEditorRef}>
        {referencedActiveSlide!.slide.map((obj, i) => (
          <EditorObject
            key={i}
            slide={referencedActiveSlide!}
            data={obj}
            preview={false}
          />
        ))}
      </div>
    </div>
  )
}

export default SlideEditor
