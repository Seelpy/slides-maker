import { ImageObject } from "../../models/types.ts"
import styles from "./SlideImage.module.css"

type ImageObjectProps = {
  data: ImageObject
}

const SlideImage = (props: ImageObjectProps) => {
  const data = props.data

  const style = {
    left: data.position.x,
    top: data.position.y,
    width: data.size.width,
    height: data.size.height,
  }

  return (
    <div className={styles.image}>
      <img
        style={style}
        src={data.data}
        onDragStart={(e) => e.preventDefault()}
      />
    </div>
  )
}

export default SlideImage
