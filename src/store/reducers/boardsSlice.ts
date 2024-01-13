import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IBoard, Id } from '../../assets/types'

interface boardsState {
  boards: IBoard[]
}

const initialState: boardsState = {
  boards: [],
}
interface changeTextPayload {
  id: Id
  text: string
}

export const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    addBoard: (state, action: PayloadAction<IBoard>) => {
      state.boards = [...state.boards, action.payload]
      localStorage.setItem('boards', JSON.stringify(state.boards))
    },
    deleteBoard: (state, action: PayloadAction<Id>) => {
      state.boards = state.boards.filter((board) => board.id !== action.payload)
      localStorage.setItem('boards', JSON.stringify(state.boards))
    },
    setBoards: (state, action: PayloadAction<IBoard[]>) => {
      state.boards = action.payload
      localStorage.setItem('boards', JSON.stringify(state.boards))
    },
    changeBoardTitle: (state, action: PayloadAction<changeTextPayload>) => {
      const changingBoardIndex = state.boards.findIndex(
        (board) => board.id === action.payload.id
      )
      state.boards[changingBoardIndex].title = action.payload.text
      localStorage.setItem('boards', JSON.stringify(state.boards))
    },
  },
})

export const { addBoard, deleteBoard, setBoards, changeBoardTitle } =
  boardsSlice.actions
export default boardsSlice.reducer
