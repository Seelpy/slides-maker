import MenuSection from '../MenuSection'
import Button from '../Button'
import ColorButton from '../ColorButton'
import { useRef } from 'react'
import { useAppSelector, useInterfaceActions, usePresentationActions } from '../../../hooks/redux.ts'

const SectionColors = () => {
  const colorPickerRef = useRef<HTMLInputElement | null>(null)

  const { activeSlideId, activeColor } = useAppSelector((state) => state.interfaceReducer)
  const { updateColor } = usePresentationActions()
  const { setActiveColor } = useInterfaceActions()

  const clickUpdateColorHandler = (
    slideId: string | undefined,
    color: string,
  ) => {
    if (slideId === undefined) {
      return
    }
    updateColor({ slideId: slideId, color: color })
  }

  return (
    <MenuSection name="Colors">
      <div>
        <Button
          onClick={() =>
            clickUpdateColorHandler(activeSlideId, activeColor)
          }
        >
          <i
            className="fa-solid fa-square"
            style={{ color: activeColor, fontSize: `1.5rem` }}
          />
          <br />
          Color
        </Button>

        <div style={{ display: `flex`, flexDirection: `column` }}>
          <div>
            <ColorButton onClick={setActiveColor} color="#ffffff" />
            <ColorButton onClick={setActiveColor} color="#66ff66" />
            <ColorButton onClick={setActiveColor} color="#ccff33" />
            <ColorButton onClick={setActiveColor} color="#ffcc66" />
            <ColorButton onClick={setActiveColor} color="#ccffcc" />
            <ColorButton onClick={setActiveColor} color="#33ccff" />
          </div>
          <div>
            <ColorButton onClick={setActiveColor} color="black" />
            <ColorButton onClick={setActiveColor} color="#ff9999" />
            <ColorButton onClick={setActiveColor} color="#ff5050" />
            <ColorButton onClick={setActiveColor} color="#ff66cc" />
            <ColorButton onClick={setActiveColor} color="#9966ff" />
            <ColorButton onClick={setActiveColor} color="#33cccc" />
          </div>
        </div>

        <input 
          type="color" 
          ref={colorPickerRef} 
          value={activeColor} 
          onChange={(e) => setActiveColor(e.target.value)}
          style={{visibility: 'hidden', position: 'absolute'}}
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
