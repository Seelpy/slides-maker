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

const Object = (props: SlideObjectProps) => {
  const data = props.data
  const style = {
    left: props.data.position.x,
    top: props.data.position.y,
  }
  return (
    <div style={style} className={styles.slideObject}>
      {getObject(data)}
    </div>
  )
}

export default Object
