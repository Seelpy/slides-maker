import { useEffect, useRef } from 'react'
import { Position, SlideInfo, SlideObject, Size, SlideObjectType, PrimitiveType } from '../models/types'
import {
  useAppSelector,
  useInterfaceActions,
  usePresentationActions,
} from '../hooks/redux'

function SelectedObjectsHandler(
  areaRef: React.MutableRefObject<HTMLDivElement | null>,
  slide: SlideInfo | undefined,
) {
  const selectedObjects = useRef<SlideObject[]>([]);
  const isDraggingThis = useRef<boolean>(false)
  const isDraggingObjects = useAppSelector(state => state.interfaceReducer.isDraggingObjects)

  const { updateSlide } = usePresentationActions()
  const { setDragObjectsDelta } = useInterfaceActions()

  const coords = useRef<{
    selectedArea: {position: Position, size: Size}
    startMouse: Position
    lastMouse: Position
    currentMouse: Position
  }>({
    selectedArea: { position: {x: 0, y: 0}, size: {width: 0, height: 0} },
    startMouse: { x: 0, y: 0 },
    lastMouse: { x: 0, y: 0 },
    currentMouse: { x: 0, y: 0 },
  })

  useEffect(() => {
    if (isDraggingObjects) {
      isDraggingThis.current = true;
      coords.current.startMouse = {...coords.current.currentMouse}
      coords.current.lastMouse = {...coords.current.currentMouse}
    } else {
      isDraggingThis.current = false;
    }
  }, [isDraggingObjects, areaRef])

  useEffect(() => {
    if (!slide) return
    selectedObjects.current = slide.slide.filter((obj) => obj.selected)
    
    if (selectedObjects.current.length > 0) {
      const minX = Math.min(...selectedObjects.current.map((obj) => obj.position.x))
      const minY = Math.min(...selectedObjects.current.map((obj) => obj.position.y))
      const maxX = Math.max(...selectedObjects.current.map((obj) => obj.position.x + obj.size.width))
      const maxY = Math.max(...selectedObjects.current.map((obj) => obj.position.y + obj.size.height))

      coords.current.selectedArea.position.x = minX
      coords.current.selectedArea.position.y = minY
      coords.current.selectedArea.size.width = maxX - minX
      coords.current.selectedArea.size.height = maxY - minY
    }
  }, [slide])

  useEffect(() => {
    if (!slide) return

    const area = areaRef.current
    if (!area) return

    const onMouseMove = (e: MouseEvent) => {
      coords.current.currentMouse.x = e.clientX
      coords.current.currentMouse.y = e.clientY

      if (!isDraggingThis.current) return

      const deltaX = e.clientX - coords.current.lastMouse.x
      const deltaY = e.clientY - coords.current.lastMouse.y
      setDragObjectsDelta(Math.abs(deltaX) + Math.abs(deltaY))

      if (e.shiftKey) {
        // Изменение размера
        const scaleX = (deltaX + coords.current.selectedArea.size.width) / coords.current.selectedArea.size.width
        const scaleY = (deltaY + coords.current.selectedArea.size.height) / coords.current.selectedArea.size.height
        selectedObjects.current.map((obj) => {
          if (obj.type !== SlideObjectType.Text) {
            let nextWidth = Math.max(10, obj.size.width * scaleX)
            let nextHeight = Math.max(10, obj.size.height * scaleY)

            if (obj.type === SlideObjectType.Primitive &&
                obj.primitiveType === PrimitiveType.Circle) 
            {
              const medium = (nextWidth + nextHeight) / 2
              nextWidth = nextHeight = medium
            }

            updateSlide({
              slide: slide,
              oldSlideObject: obj,
              newSlideObject: { ...obj, size: {width: nextWidth, height: nextHeight} },
            })
          }
        })
      } else if (e.altKey) {
        // Вращение
        const rotateAngle = (deltaX + deltaY)
        selectedObjects.current.map((obj) => {
          updateSlide({
            slide: slide,
            oldSlideObject: obj,
            newSlideObject: { ...obj, rotate: obj.rotate - rotateAngle },
          })
        })
      } else {
        // Перетаскивание
        selectedObjects.current.map((obj) => {
          updateSlide({
            slide: slide,
            oldSlideObject: obj,
            newSlideObject: { ...obj, position: { x: obj.position.x + deltaX, y: obj.position.y + deltaY } },
          })
        })
      }

      coords.current.lastMouse.x = e.clientX
      coords.current.lastMouse.y = e.clientY
    }

    area.addEventListener('mousemove', onMouseMove)

    return () => {
      area.removeEventListener('mousemove', onMouseMove)
    }
  }, [areaRef, slide])
}

export default SelectedObjectsHandler
