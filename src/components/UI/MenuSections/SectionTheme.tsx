import MenuSection from '../MenuSection'
import { useAppSelector, useThemeActions } from '../../../hooks/redux'
import { Themes } from '../../../models/types'

const ThemeIcon = (theme: Themes) => {
  switch (theme) {
    case Themes.dark:
      return <i className="fa-solid fa-moon"></i>
    case Themes.light:
      return <i className="fa-regular fa-sun"></i>
    default:
      return <></>
  }
}

const SectionTheme = () => {
  const { changeTheme } = useThemeActions()
  const { theme } = useAppSelector((state) => state.themeReducer)

  type ChangeThemePayload = {
    theme: Themes
  }

  const onChangeTheme = (data: ChangeThemePayload) => {
    console.log(data)
    changeTheme(data.theme)
  }

  return (
    <MenuSection name="Theme">
      <div>
        <div style={{ color: `var(--icon-color)`, fontSize: `2rem` }} onClick={
          () => {
          if (theme === Themes.light) onChangeTheme({ theme: Themes.dark })
          if (theme === Themes.dark) onChangeTheme({ theme: Themes.light })
        }
        }>
          {ThemeIcon(theme)}
        </div >
      </div>
    </MenuSection>
  )
}

export default SectionTheme
