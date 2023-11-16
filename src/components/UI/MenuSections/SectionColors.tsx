import MenuSection from '../MenuSection'
import Button from '../Button'
import ColorButton from '../ColorButton'
import { useState } from 'react'

const SectionColors = () => {
  const [leftColor] = useState<string>(`yellow`)
  const [rightColor] = useState<string>(`black`)

  return (
    <MenuSection name="Colors">
      <div>
        <Button>
          <i
            className="fa-solid fa-square"
            style={{ color: leftColor, fontSize: `1.5rem` }}
          />{' '}
          <br />
          Color 1
        </Button>
        <Button>
          <i
            className="fa-solid fa-square"
            style={{ color: rightColor, fontSize: `1.5rem` }}
          />{' '}
          <br />
          Color 2
        </Button>

        <div style={{ display: `flex`, flexDirection: `column` }}>
          <div>
            <ColorButton color="red" />
            <ColorButton color="blue" />
            <ColorButton color="cyan" />
          </div>
          <div>
            <ColorButton color="red" />
            <ColorButton color="blue" />
            <ColorButton color="cyan" />
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
