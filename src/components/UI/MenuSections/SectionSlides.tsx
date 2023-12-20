import MenuSection from '../MenuSection'
import Button from '../Button'
import ColorButton from '../ColorButton.tsx'
import FileHandler from '../../../services/FileHandler.ts'
import { useRef, useState, useEffect } from 'react'
import {
  useAppSelector,
  useHistoryActions,
  usePresentationActions,
} from '../../../hooks/redux'
import { SlideInfo } from '../../../models/types'
import { v4 as uuidv4 } from 'uuid'

const SectionSlides = () => {
  const activeSlideId = useAppSelector(
    (state) => state.interfaceReducer.activeSlideId,
  )
  const { createSlide, updateBackground } = usePresentationActions()
  const { setShouldSaveState } = useHistoryActions()
  const [backgroundColor, setBackgroundColor] = useState<string>('#e6e6e6')

  const colorDelayTimer = useRef<number | null>(null)
  const colorInputRef = useRef<HTMLInputElement | null>(null)
  const colorInputOpenState = useRef<boolean>(false)
  const importImageFile = useRef<HTMLInputElement | null>(null)

  const importFromImage = (slideId: string | undefined, file: File) => {
    if (slideId === undefined) {
      return
    }
    FileHandler.ImportImage(file).then((base64) => {
      updateBackground({
        slideId: slideId,
        data: `url('${base64}') no-repeat center center / contain`,
      })
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

  const handleColorUpdate = (color: string) => {
    if (activeSlideId) {
      setBackgroundColor(color)
    }
  }

  // Отслеживаем состояние колор инпута (закрыто/открыто)
  useEffect(() => {
    if (!activeSlideId) {
      return
    }

    const colorInput = colorInputRef.current
    const onInput = () => (colorInputOpenState.current = true)
    const onChange = () => (colorInputOpenState.current = false)

    colorInput?.addEventListener('input', onInput)
    colorInput?.addEventListener('change', onChange)

    return () => {
      colorInput?.removeEventListener('input', onInput)
      colorInput?.removeEventListener('change', onChange)
    }
  }, [activeSlideId, colorInputRef])

  // Мера предосторожности при быстром изменении цвета
  useEffect(() => {
    if (!activeSlideId) return
    if (colorDelayTimer.current) clearTimeout(colorDelayTimer.current)

    colorDelayTimer.current = setTimeout(() => {
      if (colorInputOpenState.current === true) {
        // Если инпут ещё открыт - не сохраняем действие в историю
        setShouldSaveState(false)
      }
      updateBackground({ slideId: activeSlideId, data: backgroundColor })
    }, 1)
  }, [backgroundColor, colorInputOpenState.current])

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
          <i className="fa-solid fa-file-image" style={{ color: `#4c88f0` }} />{' '}
          Background
        </Button>

        <input
          type="color"
          ref={colorInputRef}
          value={backgroundColor}
          onChange={(e) => handleColorUpdate(e.target.value)}
          style={{ visibility: 'hidden', position: 'absolute' }}
          tabIndex={-1}
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
