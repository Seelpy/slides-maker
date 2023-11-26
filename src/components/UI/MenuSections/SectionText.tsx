import MenuSection from '../MenuSection'
import Button from '../Button'
import { useState } from 'react'
import { useAppSelector, usePresentationActions } from '../../../hooks/redux'
import { SlideObjectType } from '../../../models/types'

const SectionText = () => {
  const { createObject, updateTextSettings } = usePresentationActions()
  const { activeSlideId, activeColor } = useAppSelector((state) => state.interfaceReducer)
  const [ fontSize, setFontSize ] = useState<number>(14)

  type UpdateSettingsPayload = {
    slideId?: string,
    align?: string,
    italic?: boolean,
    bold?: boolean,
    underline?: boolean,
    size?: number,
    fontFamily?: string,
  }

  const onSettingsUpdate = (data: UpdateSettingsPayload) => {
    if (data.slideId === undefined) {
      return
    }
    updateTextSettings({
      slideId: data.slideId,
      align: data.align,
      italic: data.italic,
      bold: data.bold,
      underline: data.underline,
      size: data.size,
      font: data.fontFamily,
    })
  }

  const onNewText = (
    slideId: string | undefined,
    type: string,
  ) => {
    if (slideId === undefined) {
      return
    }
    createObject({ slideId: slideId, type: type, subtype: undefined, color: activeColor })
  }

  const onFontSelectChange = (event: any) => {
    if (activeSlideId === undefined) {
      return
    }
    updateTextSettings({
      slideId: activeSlideId,
      font: event.target.value,
    })
  }

  const onFontSizeChange = (event: any) => {
    const value = Math.max(1, Math.min(999, event.target.value));
    setFontSize(value)

    if (activeSlideId !== undefined) {
      updateTextSettings({
        slideId: activeSlideId,
        size: value,
      })
    }
  }

  return (
    <MenuSection name="Text">
      <div>
        Font:
        <select defaultValue={'Arial'} onChange={onFontSelectChange}>
          <option value="Arial">Arial</option>
          <option value="Verdana">Verdana</option>
          <option value="Tahoma">Tahoma</option>
          <option value="Trebuchet MS">Trebuchet MS</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Georgia">Georgia</option>
          <option value="Garamond">Garamond</option>
          <option value="Courier New">Courier New</option>
          <option value="Brush Script MT">Brush Script MT</option>
        </select>
        Size:
        <input
          type="number"
          value={fontSize}
          style={{ width: `2.5rem` }}
          onChange={onFontSizeChange}
        />
      </div>

      <div>
        <Button
          onClick={() => onNewText(
            activeSlideId,
            SlideObjectType.Text,
          )}
        >
          <i className="fa-solid fa-plus" style={{ color: `#4c88f0` }} /> New Text
        </Button>
        <Button
          onClick={() =>
            onSettingsUpdate({
              slideId: activeSlideId,
              italic: true
            })
          }
        >
          <em>italic</em>
        </Button>
        <Button
          onClick={() =>
            onSettingsUpdate({
              slideId: activeSlideId,
              bold: true
            })
          }
        >
          <strong>Bold</strong>
        </Button>
        <Button
          onClick={() =>
            onSettingsUpdate({
              slideId: activeSlideId,
              underline: true
            })
          }
        >
          <u>underline</u>
        </Button>
      </div>
      <div>
        <Button onClick={() => onSettingsUpdate({
          slideId: activeSlideId,
          align: "left"
        })}>
          Left
        </Button>

        <Button onClick={() => onSettingsUpdate({
          slideId: activeSlideId,
          align: "center"
        })}>
          Center
        </Button>

        <Button onClick={() => onSettingsUpdate({
          slideId: activeSlideId,
          align: "right"
        })}>
          Right
        </Button>
      </div>
    </MenuSection>
  )
}

export default SectionText
