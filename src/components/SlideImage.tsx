import { ImageObject } from './../models/types.ts'
import styles from './SlideImage.module.css'

type ImageObjectProps = {
  data: ImageObject;
  isPreview: boolean;
}

const SlideImage = (props: ImageObjectProps) => {
  const data = props.data

  const style = {
    left: data.position.x,
    top: data.position.y,
    width: data.size.width,
    height:  data.size.height,
  }

  const clipRect = {
    clip: `rect(${-data.position.y}px, ${-data.position.x+1280}px, ${-data.position.y+720}px, ${-data.position.x}px)`
  }

  return (
    <div className={styles.image} style={props.isPreview ? clipRect : {}}>
      <img style={style} src={data.data} />
    </div>
  )
}

export default SlideImage
