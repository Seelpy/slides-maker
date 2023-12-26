import { useRef } from "react"
import {
  useAppSelector,
  useInterfaceActions,
  usePresentationActions,
} from "../../../hooks/redux"
// eslint-disable-next-line no-duplicate-imports
import {
  ImportJson,
  ExportJson,
  ExportPdf,
} from "../../../services/FileHandler.ts"
import {
  ConvertFromJson,
  ConvertToJson,
} from "../../../services/PresentationConverter"
import MenuSection from "../MenuSection"
import Button from "../Button"

const SectionInfo = () => {
  const importJsonFile = useRef<HTMLInputElement | null>(null)
  const presentation = useAppSelector((state) => state.presentationReducer)
  const { updatePresentation, changeName } = usePresentationActions()
  const { setActiveSlideId } = useInterfaceActions()

  const importFromJson = (file: File) => {
    ImportJson(file).then((stringJson) => {
      const importedPresentation = ConvertFromJson(stringJson)
      if ("name" in importedPresentation && "slides" in importedPresentation) {
        updatePresentation(importedPresentation)
        setActiveSlideId(
          importedPresentation.slides.length > 0
            ? importedPresentation.slides[0].id
            : undefined,
        )
      } else {
        alert("Error on import: `name` or `slides` keys are undefined")
      }
    })
  }

  return (
    <MenuSection name="Info">
      <div>
        <input
          value={presentation.name}
          onChange={(e) => changeName(e.target.value)}
        />
      </div>
      <div>
        <Button
          width="5.4rem"
          onClick={() =>
            ExportJson(presentation.name, ConvertToJson(presentation))
          }
        >
          Export json
        </Button>
        <Button width="5.4rem" onClick={() => importJsonFile.current?.click()}>
          Import json
        </Button>
        <input
          type="file"
          id="importJsonFile"
          ref={importJsonFile}
          style={{ display: "none" }}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const files = event.currentTarget.files
            if (files && files.length > 0) importFromJson(files[0])
            importJsonFile.current!.value = ""
          }}
        />
      </div>
      <Button
        width="5.4rem"
        onClick={() => ExportPdf(presentation.slides, presentation.name)}
      >
        Export pdf
      </Button>
    </MenuSection>
  )
}

export default SectionInfo
