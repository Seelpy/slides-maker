import MenuSection from '../MenuSection'
import Button from '../Button'
import FileHandler from '../../../services/FileHandler.ts'
import { useRef } from 'react'
import { useAppSelector, usePresentationActions } from '../../../hooks/redux'
import { SlideInfo } from '../../../models/types'
import { v4 as uuidv4 } from 'uuid'

const SectionSlides = () => {
  const { createSlide, importImageBackground } = usePresentationActions()
  const importImageFile = useRef<HTMLInputElement | null>(null)
  const activeSlideId = useAppSelector((state) => state.interfaceReducer.activeSlideId)

  const importFromImage = (slideId: string | undefined, file: File) => {
    if (slideId === undefined) {
      return
    }
    FileHandler.ImportImage(file).then((base64) => {
      importImageBackground({ slideId: slideId, data: `url('${base64}') no-repeat center center / contain` })
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
            style={{ display: 'none' }}
            accept="image/png, image/gif, image/jpeg"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const files = event.currentTarget.files
              if (files && files.length > 0)
                importFromImage(activeSlideId, files[0])
              importImageFile.current!.value = ''
            }}
          />
          <i
            className="fa-solid fa-file-image"
            style={{ color: `#4c88f0` }}
          /> Background
        </Button>
      </div>
    </MenuSection>
  )
}

export default SectionSlides
