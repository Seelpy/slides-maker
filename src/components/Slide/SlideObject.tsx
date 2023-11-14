import styles from './SlideObject.module.css'
import { SlideObject, SlideInfo, SlideObjectType } from '../../models/types.ts'
import SlidePrimitive from './SlidePrimitive.tsx'
import SlideText from './SlideText.tsx'
import SlideImage from './SlideImage.tsx'
import { useRef } from 'react'
import useDragObject from '../../hooks/useDragObject.ts'
import { useInterfaceActions } from '../../hooks/redux.ts'

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
  
  const slideObject = useRef<HTMLDivElement | null>(null);
  const {setDragObjects} = useInterfaceActions();
  
  if (!props.preview) {
    useDragObject(slideObject, props.slide, props.data, setDragObjects);
  }

  return (
    <div ref={slideObject} data-selected={props.data.selected ? `true` : `false`} style={style} className={styles.slideObject  + (props.data.selected && !props.preview? ` ${styles.activeObject}` : ``)}>
      {getObject(data)}
    </div>
  )
}

export default EditorObject
