import MenuSection from '../MenuSection'
import Button from '../Button'
import { useAppSelector, usePresentationActions } from '../../../hooks/redux'

const SectionLayers = () => {
const slides = useAppSelector((state) => state.presentationReducer.slides)
  const { activeSlideId } = useAppSelector(
    (state) => state.interfaceReducer,
  )
  const activeSlide = slides.find((s) => s.id === activeSlideId)
  const { moveObjectsInArray } = usePresentationActions()

  return (
    <MenuSection name="Layers">
      <div>
        <Button onClick={() => activeSlide && moveObjectsInArray({
            slideId: activeSlide.id,
            moveBy: 1,
        })}>
          <i className="fa-solid fa-arrow-up" style={{ color: `var(--icon-color)` }} /> to
          Foreground
        </Button>
      </div>
      <div>
        <Button onClick={() => activeSlide && moveObjectsInArray({
            slideId: activeSlide.id,
            moveBy: -1,
        })}>
          <i className="fa-solid fa-arrow-down" style={{ color: `var(--icon-color)` }} /> to
          Background
        </Button>
      </div>
    </MenuSection>
  )
}

export default SectionLayers
