import styles from './SlideObject.module.css'
import { ObjectType, SlideObjectType } from './../models/types.ts'
import SlidePrimitive from './SlidePrimitive.tsx'
import SlideText from './SlideText.tsx'
import SlideImage from './SlideImage.tsx'

type SlideObjectProps = {
  data: ObjectType
}

function getObject(data: ObjectType) {
  switch (data.type) {
    case SlideObjectType.Primitive:
      return <SlidePrimitive data={data}></SlidePrimitive>
    case SlideObjectType.Text:
      return <SlideText data={data}></SlideText>
    case SlideObjectType.Image:
      return <SlideImage data={data}></SlideImage>
  }
}

const EditorObject = (props: SlideObjectProps) => {
  const data = props.data
  const style = {
    left: data.position.x,
    top: data.position.y,
    transform: `rotate(${props.data.rotate}deg)`,
    transformOrigin: `${(props.data.size.width)/2}px ${(props.data.size.height)/2}px`,
  }

  return (
    <div style={style} className={styles.slideObject}>
      {getObject(data)}
    </div>
  )
}

export default EditorObject
