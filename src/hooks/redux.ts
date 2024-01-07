import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../store/store'
import { bindActionCreators } from 'redux'
import * as interfaceActions from '../store/actions/interfaceActions'
import * as presentationActions from '../store/actions/presentationActions'
import * as historyActions from '../store/actions/historyActions'
import * as themeActions from '../store/actions/themeActions'

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useInterfaceActions = () => {
  const dispatch = useDispatch()
  return bindActionCreators(interfaceActions, dispatch)
}
export const usePresentationActions = () => {
  const dispatch = useDispatch()
  return bindActionCreators(presentationActions, dispatch)
}
export const useHistoryActions = () => {
  const dispatch = useDispatch()
  return bindActionCreators(historyActions, dispatch)
}

export const useThemeActions = () => {
  const dispatch = useDispatch()
  return bindActionCreators(themeActions, dispatch)
}
