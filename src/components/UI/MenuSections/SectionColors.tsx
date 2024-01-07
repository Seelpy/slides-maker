import MenuSection from "../MenuSection"
import Button from "../Button"
import ColorButton from "../ColorButton"
import ColorPicker from "../ColorPicker.tsx"
import { useEffect, useRef } from "react"
import {
  useAppSelector,
  useInterfaceActions,
  usePresentationActions,
  useHistoryActions
} from "../../../hooks/redux.ts"
import { SlideObjectType } from "../../../models/types.ts"

const SectionColors = () => {
  const colorPickerRef = useRef<HTMLInputElement | null>(null)

  const { activeSlideId, activeColor } = useAppSelector(
    (state) => state.interfaceReducer,
  )
  const slides = useAppSelector((state) => state.presentationReducer.slides)
  const activeSlide = slides.find((s) => s.id === activeSlideId)
  const selectedObjects = activeSlide?.slide.filter((obj) => obj.selected)

  const { updateColor } = usePresentationActions()
  const { setActiveColor } = useInterfaceActions()
  const { setShouldSaveState } = useHistoryActions()

  const handleColorClick = (color: string, isPalette: boolean = true) => {
    if (activeSlideId === undefined) return
    
    if (isPalette) {
      setActiveColor(color)
    }
    if (selectedObjects!.length > 0) {
      updateColor({ slideId: activeSlideId, color: color })
    }
  }

  const onActiveColorUpdated = (color: string, inputOpened: boolean) => {
    if (activeSlideId === undefined) return
    
    if (selectedObjects!.length > 0) {
      setShouldSaveState(!inputOpened)
      updateColor({ slideId: activeSlideId, color: color })
    }
  }

  useEffect(() => {
    if (!selectedObjects || selectedObjects.length != 1) return
    if (selectedObjects[0].type === SlideObjectType.Image) return

    setActiveColor(selectedObjects[0].color)
  }, [activeSlide])

  return (
    <MenuSection name="Colors">
      <div>
        <Button onClick={() => handleColorClick(activeColor, false)}>
          <i
            className="fa-solid fa-square"
            style={{ color: activeColor, fontSize: `1.5rem` }}
          />
          <br />
          Color
        </Button>

        <div style={{ display: `flex`, flexDirection: `column` }}>
          <div>
            <ColorButton onClick={handleColorClick} color="#ffffff" />
            <ColorButton onClick={handleColorClick} color="#66ff66" />
            <ColorButton onClick={handleColorClick} color="#ccff33" />
            <ColorButton onClick={handleColorClick} color="#ffcc66" />
            <ColorButton onClick={handleColorClick} color="#ccffcc" />
            <ColorButton onClick={handleColorClick} color="#33ccff" />
          </div>
          <div>
            <ColorButton onClick={handleColorClick} color="black" />
            <ColorButton onClick={handleColorClick} color="#ff9999" />
            <ColorButton onClick={handleColorClick} color="#ff5050" />
            <ColorButton onClick={handleColorClick} color="#ff66cc" />
            <ColorButton onClick={handleColorClick} color="#9966ff" />
            <ColorButton onClick={handleColorClick} color="#33cccc" />
          </div>
        </div>

        <ColorPicker
          colorInputRef={colorPickerRef}
          color={activeColor}
          setColor={setActiveColor}
          onColorUpdated={onActiveColorUpdated}
        />

        <Button onClick={() => colorPickerRef.current?.click()}>
          <i
            className="fa-solid fa-palette "
            style={{ color: `#4c88f0`, fontSize: `1.5rem` }}
          />
          <br />
          Edit
        </Button>
      </div>
    </MenuSection>
  )
}

export default SectionColors
