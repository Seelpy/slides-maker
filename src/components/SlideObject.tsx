import styles from './SlideObject.module.css'
import { ObjectType, SlideObjectType } from './../models/types.ts'
import Primitive from './Primitive.tsx'

type SlideObjectProps = {
  data: ObjectType
}

function getObject(data: ObjectType) {
  switch (data.type) {
    case SlideObjectType.Primitive:
      return <Primitive data={data}></Primitive>
    case SlideObjectType.Text:
      return <div>{'hello'}</div>
    case SlideObjectType.Image:
      return <div />
  }
}

const Object = (props: SlideObjectProps) => {
  switch (props.data.type) {
    case SlideObjectType.Primitive:
  }
  const style = {
    left: props.data.position.x,
    top: props.data.position.y,
  }
  return (
    <div style={style} className={styles.slideObject}>
      {getObject(props.data)}
    </div>
  )
}

export default Object
