import styles from './SlideEditor.module.css'
import EditorObject from './SlideObject';
import { useAppSelector } from '../../hooks/redux';
import { useInterfaceActions } from '../../hooks/redux';

const SlideEditor = () => {
  const activeSlide = useAppSelector(state => state.interfaceReducer.activeSlide);
  const slides = useAppSelector(state => state.presentationReducer.slides);
  const {setDragObjects} = useInterfaceActions();

  if (activeSlide === undefined) {
    return (null);
  }

  const referencedActiveSlide = slides.find(s => s.id === activeSlide.id);

  return (
    <div className={styles.editorArea} onMouseLeave={() => setDragObjects(false)}>
      <div className={styles.slideEditor}>
          {referencedActiveSlide!.slide.map((obj, i) => (
            <EditorObject key={i} slide={referencedActiveSlide!} data={obj} preview={false}/>
          ))}
      </div>
    </div>
  )
}

export default SlideEditor
