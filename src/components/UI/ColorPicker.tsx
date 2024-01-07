import { useRef, useEffect } from "react"

type ColorPickerProps = {
  colorInputRef: React.MutableRefObject<HTMLInputElement | null>
  color: string
  setColor: (color: string) => void
  onColorUpdated: (color: string, inputOpened: boolean) => void
}

const ColorPicker = (props: ColorPickerProps) => {
  const colorInputOpenState = useRef<boolean>(false)
  const colorDelayTimer = useRef<number | null>(null)

  useEffect(() => {
    const colorInput = props.colorInputRef.current
    const onInput = () => (colorInputOpenState.current = true)
    const onChange = () => (colorInputOpenState.current = false)

    colorInput?.addEventListener("input", onInput)
    colorInput?.addEventListener("change", onChange)

    return () => {
      colorInput?.removeEventListener("input", onInput)
      colorInput?.removeEventListener("change", onChange)
    }
  }, [props.colorInputRef])

  useEffect(() => {
    if (colorDelayTimer.current) clearTimeout(colorDelayTimer.current)

    colorDelayTimer.current = setTimeout(() => {
      props.onColorUpdated(props.color, colorInputOpenState.current)
    }, 1)
  }, [props.color, colorInputOpenState.current])

  return (
    <input
      type="color"
      ref={props.colorInputRef}
      value={props.color}
      onChange={(e) => props.setColor(e.target.value)}
      style={{ visibility: "hidden", position: "absolute" }}
      tabIndex={-1}
    />
  )
}

export default ColorPicker