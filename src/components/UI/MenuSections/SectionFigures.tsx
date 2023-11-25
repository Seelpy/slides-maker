import MenuSection from '../MenuSection'
import Button from '../Button'
import { useAppSelector, usePresentationActions } from '../../../hooks/redux'
import { PrimitiveType, SlideObjectType } from '../../../models/types'

const SectionFigures = () => {
  const { createObject } = usePresentationActions()
  const { activeSlideId, activeColor } = useAppSelector((state) => state.interfaceReducer)

  const clickCreateObjectHandler = (
    slideId: string | undefined,
    type: string,
    subtype: string | undefined,
  ) => {
    if (slideId === undefined) {
      return
    }
    createObject({ slideId: slideId, type: type, subtype: subtype, color: activeColor })
  }

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
      </div>

      <div>
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
    </MenuSection>
  )
}

export default SectionFigures
