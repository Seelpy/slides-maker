import MenuSection from "../MenuSection"
import Button from "../Button"
import { useState, useEffect } from "react"
import { useAppSelector, usePresentationActions } from "../../../hooks/redux"
import { PrimitiveType, SlideObjectType } from "../../../models/types"

const SectionFigures = () => {
  const slides = useAppSelector((state) => state.presentationReducer.slides)
  const { activeSlideId, activeColor } = useAppSelector(
    (state) => state.interfaceReducer,
  )
  const activeSlide = slides.find((s) => s.id === activeSlideId)
  const { createObject, updateSlide } = usePresentationActions()
  const [rounding, setRounding] = useState<number>(0)

  const onRoundingChange = (event: any) => {
    const value = Math.max(0, Math.min(999, event.target.value))
    setRounding(value)

    if (activeSlideId !== undefined) {
      const slide = slides.find((s) => s.id === activeSlideId)
      slide!.slide.map((obj) => {
        if (obj.selected && obj.type === SlideObjectType.Primitive) {
          updateSlide({
            slideId: activeSlideId,
            oldSlideObject: obj,
            newSlideObject: { ...obj, rounding: value },
          })
        }
      })
    }
  }

  const clickCreateObjectHandler = (
    slideId: string | undefined,
    type: string,
    subtype: string | undefined,
  ) => {
    if (slideId === undefined) {
      return
    }
    createObject({
      slideId: slideId,
      type: type,
      subtype: subtype,
      color: activeColor,
    })
  }

  useEffect(() => {
    const selectedObjects = activeSlide?.slide.filter((obj) => obj.selected)

    if (!selectedObjects || selectedObjects.length != 1) return
    if (selectedObjects[0].type != SlideObjectType.Primitive) return

    setRounding(selectedObjects[0].rounding)
  }, [activeSlide])

  return (
    <MenuSection name="Figures">
      <div>
        <Button
          width="2.5rem"
          height="2.5rem"
          onClick={() =>
            clickCreateObjectHandler(
              activeSlideId,
              SlideObjectType.Primitive,
              PrimitiveType.Circle,
            )
          }
        >
          <i
            className="fa-solid fa-circle fa-2xl"
            style={{ color: `#4c88f0` }}
          />
        </Button>

        <Button
          width="2.5rem"
          height="2.5rem"
          onClick={() =>
            clickCreateObjectHandler(
              activeSlideId,
              SlideObjectType.Primitive,
              PrimitiveType.Square,
            )
          }
        >
          <i
            className="fa-solid fa-square fa-2xl"
            style={{ color: `#4c88f0` }}
          />
        </Button>
        <Button
          width="2.5rem"
          height="2.5rem"
          onClick={() =>
            clickCreateObjectHandler(
              activeSlideId,
              SlideObjectType.Primitive,
              PrimitiveType.Triangle,
            )
          }
        >
          <i
            className="fa-solid fa-caret-up fa-2xl"
            style={{ color: `#4c88f0` }}
          />
        </Button>
      </div>

      <div>
        Rounding:
        <input
          type="number"
          value={rounding}
          style={{ width: `2.5rem` }}
          onChange={(e) => onRoundingChange(e)}
        />
      </div>
    </MenuSection>
  )
}

export default SectionFigures
