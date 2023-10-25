import themeReducer from '../features/theme'
import loginReducer from '../features/login.js'
import profileReducer from '../features/profile.js'
import { configureStore } from '@reduxjs/toolkit'

export default configureStore({
  reducer: {
    theme: themeReducer,
    login: loginReducer,
    profile: profileReducer
  },
})