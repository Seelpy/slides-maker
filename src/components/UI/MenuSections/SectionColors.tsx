import MenuSection from '../MenuSection'
import Button from '../Button'
import ColorButton from '../ColorButton'
import { useState } from 'react'
import { usePresentationActions } from '../../../hooks/redux.ts'

type SectionColorProps = {
  activeSlideId: string | undefined
}

const SectionColors = (props: SectionColorProps) => {
  const [leftColor, setLeftColor] = useState<string>(`yellow`)
  const [rightColor, setRightColor] = useState<string>(`black`)

  const { updateColor } = usePresentationActions()

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
            clickUpdateColorHandler(props.activeSlideId, leftColor)
          }
        >
          <i
            className="fa-solid fa-square"
            style={{ color: leftColor, fontSize: `1.5rem` }}
          />{' '}
          <br />
          Color 1
        </Button>
        <Button
          onClick={() =>
            clickUpdateColorHandler(props.activeSlideId, rightColor)
          }
        >
          <i
            className="fa-solid fa-square"
            style={{ color: rightColor, fontSize: `1.5rem` }}
          />{' '}
          <br />
          Color 2
        </Button>

        <div style={{ display: `flex`, flexDirection: `column` }}>
          <div>
            <ColorButton onClick={setLeftColor} color="red" />
            <ColorButton onClick={setLeftColor} color="blue" />
            <ColorButton onClick={setLeftColor} color="cyan" />
            <ColorButton onClick={setLeftColor} color="black" />
            <ColorButton onClick={setLeftColor} color="gray" />
            <ColorButton onClick={setLeftColor} color="white" />
          </div>
          <div>
            <ColorButton onClick={setRightColor} color="red" />
            <ColorButton onClick={setRightColor} color="blue" />
            <ColorButton onClick={setRightColor} color="cyan" />
            <ColorButton onClick={setRightColor} color="black" />
            <ColorButton onClick={setRightColor} color="gray" />
            <ColorButton onClick={setRightColor} color="white" />
          </div>
        </div>

        <Button>
          <i
            className="fa-solid fa-palette "
            style={{ color: `#4c88f0`, fontSize: `1.5rem` }}
          />{' '}
          <br />
          Edit
        </Button>
      </div>
    </MenuSection>
  )
}

export default SectionColors
