import themeReducer from '../features/theme'
import loginReducer from '../features/login'
import { configureStore } from '@reduxjs/toolkit'

export default configureStore({
  reducer: {
    theme: themeReducer,
    login: loginReducer,
  },
})