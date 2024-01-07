import MenuSection from "../MenuSection"
import Button from "../Button"
import ColorButton from "../ColorButton"
import { useRef } from "react"
import {
  useAppSelector,
  useInterfaceActions,
  usePresentationActions,
} from "../../../hooks/redux.ts"

const SectionColors = () => {
  const colorPickerRef = useRef<HTMLInputElement | null>(null)

  const { activeSlideId, activeColor } = useAppSelector(
    (state) => state.interfaceReducer,
  )
  const { updateColor } = usePresentationActions()
  const { setActiveColor } = useInterfaceActions()

  const handleColorClick = (color: string, isPalette: boolean = true) => {
    if (activeSlideId === undefined) {
      return
    }
    if (isPalette) {
      setActiveColor(color)
    }
    updateColor({ slideId: activeSlideId, color: color })
  }

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

        <input
          type="color"
          ref={colorPickerRef}
          value={activeColor}
          onChange={(e) => setActiveColor(e.target.value)}
          style={{ visibility: "hidden", position: "absolute" }}
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
