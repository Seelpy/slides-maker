import { useEffect } from "react"

function useHotkey(
  hotkeys: string[],
  callback: (event: KeyboardEvent) => void,
) {
  // Разделяет строку по первому '+' после конца слова
  const hotkeyArrays = hotkeys.map((hotkey) =>
    Array.from(
      new Set(hotkey.toLocaleLowerCase().replace(/\s+/g, "").split(/\b\+/g)),
    ),
  )

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

    for (let i = 0; i < hotkeyArrays.length; i++) {
      // Случай с символом '*' - любая клавиша вызывает коллбек
      if (hotkeyArrays[i].length === 1 && hotkeyArrays[i][0] === "*") {
        return true
      }

      // Если массив клавиш одинаков с массивом активных клавиш
      if (
        hotkeyArrays[i].length === activeKeys.length &&
        hotkeyArrays[i].every((key) => activeKeys.includes(key))
      ) {
        return true
      }
    }

    return false
  }

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (isSameHotkeys(event)) {
        callback(event)
      }
    }

    document.addEventListener("keydown", onKeyDown)

    return () => {
      document.removeEventListener("keydown", onKeyDown)
    }
  }, [hotkeys, callback])
}

export default useHotkey
