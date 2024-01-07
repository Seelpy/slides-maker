import { createReducer } from '../createReducer.ts'
import {
  changeTheme
} from '../actions/themeActions.ts'
import { Themes } from '../../models/types.ts'

type initialThemeStateType = {
  theme: Themes
}

const initialThemeState = {
  theme: Themes.light
} as initialThemeStateType

const themeReducer = createReducer(initialThemeState, {
  [changeTheme.type]: (state, action: typeof changeTheme.actionInstance) => {
    return {...state, theme: action.payload}
  }
})

export default themeReducer
