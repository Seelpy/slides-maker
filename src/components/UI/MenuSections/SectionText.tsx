import MenuSection from '../MenuSection'
import Button from '../Button'
import { useAppSelector, usePresentationActions } from '../../../hooks/redux'
import { SlideObjectType } from '../../../models/types'

const SectionText = () => {
  const { createObject, updateTextSettings } = usePresentationActions()
  const activeSlideId = useAppSelector((state) => state.interfaceReducer.activeSlideId)

  const clickCreateObjectHandler = (
    slideId: string | undefined,
    type: string,
    subtype: string | undefined,
  ) => {
    if (slideId === undefined) {
      return
    }
    createObject({ slideId: slideId, type: type, subtype: subtype })
  }

  const clickUpdateSettingsHandler = (
    slideId?: string,
    italic?: boolean,
    bold?: boolean,
    underline?: boolean,
    size?: number,
    fontFamily?: string,
  ) => {
    if (slideId === undefined) {
      return
    }
    updateTextSettings({
      slideId: slideId,
      italic: italic,
      bold: bold,
      underline: underline,
      size: size,
      font: fontFamily,
    })
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

  const onSizeChange = (event: any) => {
    if (activeSlideId === undefined) {
      return
    }
    updateTextSettings({
      slideId: activeSlideId,
      size: event.target.value,
    })
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
          defaultValue={14}
          style={{ width: `2.5rem` }}
          onChange={onSizeChange}
        />
      </div>

      <div>
        <Button
          onClick={() =>
            clickCreateObjectHandler(
              activeSlideId,
              SlideObjectType.Text,
              undefined,
            )
          }
        >
          <i className="fa-solid fa-plus" style={{ color: `#4c88f0` }} /> New Text
        </Button>
        <Button
          onClick={() =>
            clickUpdateSettingsHandler(
              activeSlideId,
              true,
              undefined,
              undefined,
              undefined,
              undefined,
            )
          }
        >
          <em>italic</em>
        </Button>
        <Button
          onClick={() =>
            clickUpdateSettingsHandler(
              activeSlideId,
              undefined,
              true,
              undefined,
              undefined,
              undefined,
            )
          }
        >
          <strong>Bold</strong>
        </Button>
        <Button
          onClick={() =>
            clickUpdateSettingsHandler(
              activeSlideId,
              undefined,
              undefined,
              true,
              undefined,
              undefined,
            )
          }
        >
          <u>underline</u>
        </Button>
      </div>
    </MenuSection>
  )
}

export default SectionText
