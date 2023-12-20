import { useEffect, useRef } from 'react'
import {
  useAppSelector,
  useInterfaceActions,
  usePresentationActions,
} from './redux'
import { Position, Size, SlideInfo, SlideObject } from '../models/types'

function useSelectObjects(
  activeSlide: SlideInfo | undefined,
  areaRef: React.MutableRefObject<HTMLDivElement | null>,
  editorRef: React.MutableRefObject<HTMLDivElement | null>,
  selectionRef: React.MutableRefObject<HTMLDivElement | null>,
) {
  const { isSelectingArea } = useAppSelector((state) => state.interfaceReducer)
  const { setSelectingArea } = useInterfaceActions()
  const { updateSlide } = usePresentationActions()

  const isSelecting = useRef<boolean>(false)
  const coords = useRef<{
    startMouse: Position
    currentMouse: Position
    selection: { position: Position; size: Size }
  }>({
    startMouse: { x: 0, y: 0 },
    currentMouse: { x: 0, y: 0 },
    selection: {
      position: { x: -1e5, y: -1e5 },
      size: { width: 0, height: 0 },
    },
  })

  const isObjectInArea = (
    obj: SlideObject,
    area: { position: Position; size: Size },
  ): boolean => {
    return (
      obj.position.x < area.position.x + area.size.width &&
      obj.position.x + obj.size.width > area.position.x &&
      obj.position.y < area.position.y + area.size.height &&
      obj.position.y + obj.size.height > area.position.y
    )
  }

  useEffect(() => {
    isSelecting.current = isSelectingArea

    if (selectionRef.current) {
      if (isSelectingArea) {
        coords.current.startMouse = { ...coords.current.currentMouse }
        selectionRef.current.style.display = 'block'
        selectionRef.current.style.width = '0px'
        selectionRef.current.style.height = '0px'
        coords.current.selection = {
          position: { x: -1e5, y: -1e5 },
          size: { width: 0, height: 0 },
        }
      } else {
        if (activeSlide && selectionRef.current.style.display === 'block') {
          activeSlide.slide.map((obj) =>
            updateSlide({
              slideId: activeSlide.id,
              oldSlideObject: obj,
              newSlideObject: {
                ...obj,
                selected: isObjectInArea(obj, coords.current.selection),
              },
            }),
          )
        }

        selectionRef.current.style.display = 'none'
      }
    }
  }, [isSelectingArea, activeSlide])

  useEffect(() => {
    const area = areaRef.current
    const editor = editorRef.current

    if (!area) return
    if (!editor) return

    const selection = selectionRef.current!

    const onMouseDown = (e: MouseEvent) => {
      if (e.target === area || e.target === editor) setSelectingArea(true)
    }

    const onMouseMove = (e: MouseEvent) => {
      coords.current.currentMouse.x = e.clientX
      coords.current.currentMouse.y = e.clientY

      if (!isSelecting.current) return

      let width = e.clientX - coords.current.startMouse.x
      let height = e.clientY - coords.current.startMouse.y
      let left = coords.current.startMouse.x - editor.offsetLeft
      let top = coords.current.startMouse.y - editor.offsetTop

      if (width < 0) {
        width = Math.abs(width)
        left -= width
      }
      if (height < 0) {
        height = Math.abs(height)
        top -= height
      }

      selection.style.top = `${top}px`
      selection.style.left = `${left}px`
      selection.style.width = `${width}px`
      selection.style.height = `${height}px`

      coords.current.selection = {
        position: { x: left, y: top },
        size: { width: width, height: height },
      }
    }

    area.addEventListener('mousedown', onMouseDown)
    area.addEventListener('mousemove', onMouseMove)

    return () => {
      area.removeEventListener('mousedown', onMouseDown)
      area.addEventListener('mousemove', onMouseMove)
    }
  }, [activeSlide, areaRef, editorRef])
}

export default useSelectObjects
