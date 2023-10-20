import styles from './SlideObject.module.css'
import { ObjectType, SlideObjectType } from '../../models/types.ts'
import SlidePrimitive from './SlidePrimitive.tsx'
import SlideText from './SlideText.tsx'
import SlideImage from './SlideImage.tsx'

type SlideObjectProps = {
  data: ObjectType;
  preview: boolean,
}

function getObject(data: ObjectType) {
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
  }

  console.log(props.data.selected, data.type)
  return (
    <div style={style} className={styles.slideObject  + (props.data.selected && !props.preview? ` ${styles.activeObject}` : ``)}>
      {getObject(data)}
    </div>
  )
}

export default EditorObject
