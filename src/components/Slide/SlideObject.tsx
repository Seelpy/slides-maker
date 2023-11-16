import styles from './SlideObject.module.css'
import { SlideObject, SlideInfo, SlideObjectType } from '../../models/types.ts'
import SlidePrimitive from './SlidePrimitive.tsx'
import SlideText from './SlideText.tsx'
import SlideImage from './SlideImage.tsx'
import { useRef } from 'react'
import useDragObject from '../../hooks/useDragObject.ts'
import { useAppSelector, usePresentationActions } from '../../hooks/redux.ts'

type UserSelect = "none";
type SlideObjectProps = {
  slide: SlideInfo;
  data: SlideObject;
  preview: boolean,
}

function getObject(data: SlideObject) {
  switch (data.type) {
    case SlideObjectType.Primitive:
      return <SlidePrimitive data={data}/>

    case SlideObjectType.Text:
      return <SlideText data={data}/>

    case SlideObjectType.Image:
      return <SlideImage data={data}/>
  }
}

const EditorObject = (props: SlideObjectProps) => {
  const data = props.data;
  const style = {
    left: data.position.x,
    top: data.position.y,
    width: data.size.width,
    height: data.size.height,
    transform: `rotate(${props.data.rotate}deg)`,
    transformOrigin: `${(props.data.size.width)/2}px ${(props.data.size.height)/2}px`,
    userSelect: "none" as UserSelect,
  }
  
  const dragObjectsDelta = useAppSelector(state => state.interfaceReducer.dragObjectsDelta);
  const {updateSlide} = usePresentationActions();
  const slideObject = useRef<HTMLDivElement | null>(null);

  if (!props.preview) {
    useDragObject(slideObject, props.slide, props.data);
  }

  const handleObjectClick = (event: React.MouseEvent) => {
    if (dragObjectsDelta === 0) {
      if (!event.ctrlKey) {
        // снимаем выделение со всех объектов
        props.slide.slide.map(obj => updateSlide({slide: props.slide, oldSlideObject: obj, newSlideObject: {...obj, selected: false}}));

        // Выделяем текущий
        updateSlide({slide: props.slide, oldSlideObject: props.data, newSlideObject: {...props.data, selected: true}});
      }
      else {
        // Изменяем выделение текущего
        updateSlide({slide: props.slide, oldSlideObject: props.data, newSlideObject: {...props.data, selected: !props.data.selected}});
      }
    }
  }

  return (
    <div 
      style={style} 
      ref={slideObject}
      className={styles.slideObject  + (props.data.selected && !props.preview? ` ${styles.activeObject}` : ``)}
      onClick={!props.preview ? (e) => handleObjectClick(e) : () => {}}
    >
      {getObject(data)}
    </div>
  )
}

export default EditorObject
