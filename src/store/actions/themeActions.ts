import { createAction } from '../createAction.ts'
import { Themes } from '../../models/types.ts'

enum ThemeActions {
  changeTheme = "CHANGE_THEME"
}

type ChangeThemePayload = Themes

export const changeTheme = createAction<ChangeThemePayload>(ThemeActions.changeTheme)