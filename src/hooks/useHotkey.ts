import { useEffect } from "react"

function useHotkey(data: {hotkey: string, callback: (event: KeyboardEvent) => void}) {
  // Разделяет строку по первому '+' после конца слова
  const hotkeyArray = Array.from(new Set(
    data.hotkey.toLocaleLowerCase().replace(/\s+/g, "").split(/\b\+/g)
  ))

  const getActiveKeysArray = (event: KeyboardEvent) => {
    const activeKeys: Set<string> = new Set()
    activeKeys.add(event.key.toLocaleLowerCase())
    if (event.ctrlKey) activeKeys.add("ctrl")
    if (event.altKey) activeKeys.add("alt")
    if (event.shiftKey) activeKeys.add("shift")
    return Array.from(activeKeys)
  }

  const isSameHotkeys = (event: KeyboardEvent): boolean => {
    const activeKeys = getActiveKeysArray(event)
    if (hotkeyArray.length === 1 && hotkeyArray[0] === "*") {
      return true
    }
    return hotkeyArray.length === activeKeys.length && 
      hotkeyArray.every((key) => activeKeys.includes(key))
  }

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (isSameHotkeys(event)) {
        data.callback(event)
      }
    }

    document.addEventListener("keydown", onKeyDown)

    return () => {
      document.removeEventListener("keydown", onKeyDown)
    }
  }, [data])
}

export default useHotkey 