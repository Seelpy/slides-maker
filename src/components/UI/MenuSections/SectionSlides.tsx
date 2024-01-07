import MenuSection from "../MenuSection"
import Button from "../Button"
import ColorButton from "../ColorButton.tsx"
import ColorPicker from "../ColorPicker.tsx"
import { ImportImage } from "../../../services/FileHandler.ts"
import { useRef, useState } from "react"
import {
  useAppSelector,
  useHistoryActions,
  usePresentationActions,
} from "../../../hooks/redux"
import { SlideInfo } from "../../../models/types"
import { v4 as uuidv4 } from "uuid"

const SectionSlides = () => {
  const slides = useAppSelector((state) => state.presentationReducer.slides)
  const activeSlideId = useAppSelector(
    (state) => state.interfaceReducer.activeSlideId,
  )
  const { createSlide, updateBackground } = usePresentationActions()
  const { setShouldSaveState } = useHistoryActions()
  const [backgroundColor, setBackgroundColor] = useState<string>("#e6e6e6")

  const colorInputRef = useRef<HTMLInputElement | null>(null)
  const importImageFile = useRef<HTMLInputElement | null>(null)

  const importFromImage = (slideId: string | undefined, file: File) => {
    if (slideId === undefined) {
      return
    }
    ImportImage(file).then((base64) => {
      const selectedSlides = slides.filter((s) => s.selected)

      if (selectedSlides.length === 0) {
        updateBackground({
          slideId: slideId,
          data: `url('${base64}') no-repeat center center / contain`,
        })
      } else {
        selectedSlides.map((s) =>
          updateBackground({
            slideId: s.id,
            data: `url('${base64}') no-repeat center center / contain`,
          }),
        )
      }
    })
  }

  const handleNewSlide = () => {
    const emptySlide: SlideInfo = {
      id: uuidv4(),
      selected: false,
      slide: [],
    }

    createSlide(emptySlide)
  }

  const onBackoundColorUpdated = (color: string, inputOpened: boolean) => {
    if (activeSlideId === undefined) return
    
    setShouldSaveState(!inputOpened)
    
    const selectedSlides = slides.filter((s) => s.selected)
    if (selectedSlides.length === 0) {
      updateBackground({ slideId: activeSlideId, data: color })
    } else {
      selectedSlides.map((s) =>
        updateBackground({ slideId: s.id, data: color }),
      )
    }
  }

  return (
    <MenuSection name="Slides">
      <div>
        <Button onClick={() => handleNewSlide()}>
          <i className="fa-solid fa-plus" style={{ color: `#4c88f0` }} /> New
          Slide
        </Button>
      </div>
      <div>
        <Button onClick={() => importImageFile.current?.click()}>
          <input
            type="file"
            ref={importImageFile}
            style={{ display: "none" }}
            accept="image/png, image/gif, image/jpeg"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const files = event.currentTarget.files
              if (files && files.length > 0)
                importFromImage(activeSlideId, files[0])
              importImageFile.current!.value = ""
            }}
          />
          <i className="fa-solid fa-file-image" style={{ color: `#4c88f0` }} />{" "}
          Background
        </Button>

        <ColorPicker
          colorInputRef={colorInputRef}
          color={backgroundColor}
          setColor={setBackgroundColor}
          onColorUpdated={onBackoundColorUpdated}
        />
        <ColorButton
          color={backgroundColor}
          onClick={() => colorInputRef.current?.click()}
        />
      </div>
    </MenuSection>
  )
}

export default SectionSlides
