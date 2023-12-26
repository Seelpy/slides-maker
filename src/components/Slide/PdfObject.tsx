import styles from "./SlideObject.module.css"
import { SlideObject, SlideInfo, SlideObjectType } from "../../models/types.ts"
import SlideImage from "./SlideImage.tsx"
import PdfText from "./PdfText.tsx"
import SlidePrimitive from "./SlidePrimitive.tsx"

type UserSelect = "none"
type SlideObjectProps = {
  slide: SlideInfo
  data: SlideObject
  preview: boolean
}

function getObject(data: SlideObject, slide: SlideInfo) {
  switch (data.type) {
    case SlideObjectType.Primitive:
      return <SlidePrimitive data={data} />

    case SlideObjectType.Text:
      return <PdfText data={data} slide={slide} />

    case SlideObjectType.Image:
      return <SlideImage data={data} />
  }
}

const PdfObject = (props: SlideObjectProps) => {
  const data = props.data
  const style = {
    left: data.position.x,
    top: data.position.y,
    width: data.size.width,
    height: data.size.height,
    transform: `rotate(${props.data.rotate}deg)`,
    transformOrigin: `${props.data.size.width / 2}px ${
      props.data.size.height / 2
    }px`,
    userSelect: "none" as UserSelect,
  }

  return (
    <div style={style} className={styles.slideObject}>
      {getObject(data, props.slide)}
    </div>
  )
}

export default PdfObject
