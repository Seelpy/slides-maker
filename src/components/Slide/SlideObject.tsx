import styles from "./SlideObject.module.css"
import { SlideObject, SlideInfo, SlideObjectType } from "../../models/types.ts"
import SlidePrimitive from "./SlidePrimitive.tsx"
import SlideText from "./SlideText.tsx"
import SlideImage from "./SlideImage.tsx"
import { useRef } from "react"
import {
  useHistoryActions,
  useInterfaceActions,
  usePresentationActions,
} from "../../hooks/redux.ts"

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
      return <SlideText data={data} slide={slide} />

    case SlideObjectType.Image:
      return <SlideImage data={data} />
  }
}

const EditorObject = (props: SlideObjectProps) => {
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

  const { updateSlide } = usePresentationActions()
  const { setDragObjects, setDragObjectsDelta } = useInterfaceActions()
  const { setShouldSaveState } = useHistoryActions()
  const slideObject = useRef<HTMLDivElement | null>(null)

  const handleMouseClick = (event: React.MouseEvent, isFromDrag: boolean) => {
    if (!props.data.selected && !event.ctrlKey) {
      if (!isFromDrag) {
        setShouldSaveState(false)
      }

      // снимаем выделение со всех объектов
      props.slide.slide.map((obj) =>
        updateSlide({
          slideId: props.slide.id,
          oldSlideObject: obj,
          newSlideObject: { ...obj, selected: false },
        }),
      )

      // Выделяем текущий
      updateSlide({
        slideId: props.slide.id,
        oldSlideObject: props.data,
        newSlideObject: { ...props.data, selected: true },
      })
    }
    else if (event.ctrlKey) {
      if (!isFromDrag) {
        setShouldSaveState(false)
      }

      // Переключаем текущий
      updateSlide({
        slideId: props.slide.id,
        oldSlideObject: props.data,
        newSlideObject: { ...props.data, selected: !props.data.selected },
      })   
    }
  }

  const handleMouseDrag = (event: React.MouseEvent) => {
    handleMouseClick(event, true)
    setDragObjects(true)
    setDragObjectsDelta(0)
  }

  return (
    <div
      style={style}
      ref={slideObject}
      className={
        styles.slideObject +
        (props.data.selected && !props.preview ? ` ${styles.activeObject}` : ``)
      }
      draggable={true}
      onClick={!props.preview ? (e) => handleMouseClick(e, false) : () => {}}
      onDragStart={!props.preview ? (e) => handleMouseDrag(e) : () => {}}
    >
      {getObject(data, props.slide)}
    </div>
  )
}

export default EditorObject
