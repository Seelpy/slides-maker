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
  const isMouseDown = useRef<boolean>(false)
  const isDragging = useRef<boolean>(false)

  const handleMouseDown = (event: React.MouseEvent) => {
    if (!props.data.selected && !event.ctrlKey &&!event.metaKey) {
      setShouldSaveState(false)

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
    } else if (event.ctrlKey || event.metaKey) {
      setShouldSaveState(false)

      // Переключаем текущий
      updateSlide({
        slideId: props.slide.id,
        oldSlideObject: props.data,
        newSlideObject: { ...props.data, selected: !props.data.selected },
      })
    }

    isMouseDown.current = true
    isDragging.current = false
  }

  const handleMouseMove = () => {
    if (isMouseDown.current && !isDragging.current) {
      isDragging.current = true
      setDragObjects(true)
      setDragObjectsDelta(0)
    }
  }

  return (
    <div
      style={style}
      ref={slideObject}
      className={
        styles.slideObject +
        (props.data.selected && !props.preview ? ` ${styles.activeObject}` : ``)
      }
      onMouseDown={!props.preview ? (e) => handleMouseDown(e) : () => {}}
      onMouseUp={() => (isMouseDown.current = false)}
      onMouseMove={() => handleMouseMove()}
    >
      {getObject(data, props.slide)}
    </div>
  )
}

export default EditorObject
