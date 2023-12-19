import MenuSection from '../MenuSection'
import Button from '../Button'
import FileHandler from '../../../services/FileHandler.ts'
import { useRef } from 'react'
import { useAppSelector, usePresentationActions } from '../../../hooks/redux'

const SectionImages = () => {
  const importImageFile = useRef<HTMLInputElement | null>(null)
  const { importImage } = usePresentationActions()
  const activeSlideId = useAppSelector((state) => state.interfaceReducer.activeSlideId)

  const importFromImage = (slideId: string | undefined, file: File) => {
    if (slideId === undefined) {
      return
    }
    FileHandler.ImportImage(file).then((base64) => {
      const image = document.createElement('img');
      image.addEventListener('load', () => {
        importImage({ slideId: slideId, data: base64, width: image.width, height: image.height })
      });
      image.src = base64;
    })
  }

  return (
    <MenuSection name="Images">
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
            style={{ color: `#4c88f0`, fontSize: `1.5rem` }}
          />
          <br />
          Upload <br />
          Image
        </Button>
      </div>
    </MenuSection>
  )
}

export default SectionImages
