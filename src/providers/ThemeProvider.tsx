import { useAppSelector } from '../hooks/redux.ts'
import { useEffect } from 'react'
import { Themes } from '../models/types.ts'

enum DataTheme {
  light = "light",
  dark = "dark"
}

function ConvertThemeToCSS(theme: Themes): string {
  switch (theme){
    case Themes.light:
      return DataTheme.light
    case Themes.dark:
      return DataTheme.dark
    default:
      return ""
  }
}

const ThemeProvider = ({ children }) => {
  const { theme } = useAppSelector((state) => state.themeReducer)

  useEffect(() => {
    document.documentElement.dataset.theme = ConvertThemeToCSS(theme)
    console.log(theme)
  }, [ theme ])

  return (
    <>
      {children}
    </>
  )
}

export default ThemeProvider