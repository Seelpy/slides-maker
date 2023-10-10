import styles from './SlideObject.module.css'
import { SlideObject } from './../models/types.ts'

type SlideObjectProps = {
  data: SlideObject
}

const SlideObjectComponent = (props: SlideObjectProps) => {
  return (
    <div className={styles.slideObject}>
      <svg width="400" height="110">
        <rect width={props.data.size.width} height={props.data.size.height} />
      </svg>
    </div>
  )
}

export default SlideObjectComponent
