import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import windowsSlice from './reducers/windowsSlice'
import boardsSlice from './reducers/boardsSlice'
import columnsSlice from './reducers/columnsSlice'
import tasksSlice from './reducers/tasksSlice'

const rootReducer = combineReducers({
  windows: windowsSlice,
  boards: boardsSlice,
  columns: columnsSlice,
  tasks: tasksSlice,
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
