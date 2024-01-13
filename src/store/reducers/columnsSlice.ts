import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IColumn, Id } from '../../assets/types'

interface columnsState {
  columns: IColumn[]
}

const initialState: columnsState = {
  columns: [],
}

interface changeTextPayload {
  id: Id
  text: string
}

export const columnsSlice = createSlice({
  name: 'columns',
  initialState,
  reducers: {
    addColumn: (state, action: PayloadAction<IColumn>) => {
      state.columns = [...state.columns, action.payload]
      localStorage.setItem('columns', JSON.stringify(state.columns))
    },
    deleteColumn: (state, action: PayloadAction<Id>) => {
      state.columns = state.columns.filter(
        (column) => column.id !== action.payload
      )
      localStorage.setItem('columns', JSON.stringify(state.columns))
    },
    changeColumns: (state, action: PayloadAction<IColumn[]>) => {
      state.columns = action.payload
      localStorage.setItem('columns', JSON.stringify(state.columns))
    },
    changeColumnTitle: (state, action: PayloadAction<changeTextPayload>) => {
      const changingColIndex = state.columns.findIndex(
        (col) => col.id === action.payload.id
      )
      state.columns[changingColIndex].title = action.payload.text
      localStorage.setItem('columns', JSON.stringify(state.columns))
    },
    setColumns: (state, action: PayloadAction<IColumn[]>) => {
      state.columns = action.payload
      localStorage.setItem('columns', JSON.stringify(state.columns))
    },
  },
})

export const {
  addColumn,
  deleteColumn,
  changeColumns,
  changeColumnTitle,
  setColumns,
} = columnsSlice.actions
export default columnsSlice.reducer
