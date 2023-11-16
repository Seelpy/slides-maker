import MenuSection from '../MenuSection'
import Button from '../Button'
import { usePresentationActions } from '../../../hooks/redux'
import { useRef } from 'react'
import FileHandler from '../../../services/FileHandler.ts'

type SectionImagesProps = {
  activeSlideId: string | undefined
}

const SectionImages = (props: SectionImagesProps) => {
  const importImageFile = useRef<HTMLInputElement | null>(null)
  const { importImage } = usePresentationActions()

  const importFromImage = (slideId: string | undefined, file: File) => {
    if (slideId === undefined) {
      return
    }
    FileHandler.ImportImage(file).then((base64) => {
      importImage({ slideId: slideId, data: base64 })
    })
  }

  // const clickCreateObjectHandler = (
  //   slideId: string | undefined,
  //   type: string,
  //   subtype: string | undefined,
  // ) => {
  //   if (slideId === undefined) {
  //     return
  //   }
  //   createObject({ slideId: slideId, type: type, subtype: subtype })
  // }

  return (
    <MenuSection name="Images">
      <div>
        <Button onClick={() => importImageFile.current?.click()}>
          <input
            type="file"
            id="importImageFile"
            ref={importImageFile}
            style={{ display: 'none' }}
            accept="image/png, image/gif, image/jpeg"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const files = event.currentTarget.files
              if (files && files.length > 0)
                importFromImage(props.activeSlideId, files[0])
              importImageFile.current!.value = ''
            }}
          />
          <i
            className="fa-solid fa-file-image"
            style={{ color: `#4c88f0`, fontSize: `1.5rem` }}
          />{' '}
          <br />
          Upload <br />
          Image
        </Button>
      </div>
    </MenuSection>
  )
}

export default SectionImages
