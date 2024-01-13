import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface windowsState {
  isSidebar: boolean
  isAddNewBoard: boolean
  sidebarWidth: string
  isAddNewTask: boolean
  isEditBoard: boolean
}

const initialState: windowsState = {
  isSidebar: false,
  sidebarWidth: '0px',
  isAddNewBoard: false,
  isAddNewTask: false,
  isEditBoard: false,
}

export const windowsSlice = createSlice({
  name: 'window',
  initialState,
  reducers: {
    openSidebar: (state) => {
      state.isSidebar = true
    },
    closeSidebar: (state) => {
      state.isSidebar = false
    },
    setSidebarWidth: (state, action: PayloadAction<number | string>) => {
      state.sidebarWidth = [action.payload, 'px'].join('')
    },
    openAddNewBoard: (state) => {
      state.isAddNewBoard = true
    },
    closeAddNewBoard: (state) => {
      state.isAddNewBoard = false
    },
    openAddNewTask: (state) => {
      state.isAddNewTask = true
    },
    closeAddNewTask: (state) => {
      state.isAddNewTask = false
    },
    openEditBoard: (state) => {
      state.isEditBoard = true
    },
    closeEditBoard: (state) => {
      state.isEditBoard = false
    },
  },
})

export const {
  openSidebar,
  closeSidebar,
  setSidebarWidth,
  openAddNewBoard,
  closeAddNewBoard,
  openAddNewTask,
  closeAddNewTask,
  openEditBoard,
  closeEditBoard,
} = windowsSlice.actions
export default windowsSlice.reducer
