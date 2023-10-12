import { ImageObject } from './../models/types.ts'
import styles from './SlideText.module.css'

type ImageObjectProps = {
  data: ImageObject
}

const SlideImage = (props: ImageObjectProps) => {
  const data = props.data

  const img = new Image()
  img.src = data.data

  const style = {
    left: data.position.x,
    top: data.position.y,
    transform:
      'scale(' +
      data.size.width / img.width +
      ',' +
      data.size.height / img.height +
      ')',
  }

  return (
    <div className={styles.text} style={style}>
      <img style={style} src={data.data} />
    </div>
  )
}

export default SlideImage