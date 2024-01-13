import { Route, Routes } from 'react-router'
import './index.css'
import Layout from './components/Layout'
import ColumnsContainer from './components/ColumnsContainer'
import Intro from './components/Intro'
import { useAppDispatch } from './store/hooks/redux'
import { useEffect } from 'react'
import { setBoards } from './store/reducers/boardsSlice'
import { IBoard, IColumn, ITask } from './assets/types'
import { setColumns } from './store/reducers/columnsSlice'
import { setTasks } from './store/reducers/tasksSlice'

function App() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    const rawBoards = localStorage.getItem('boards')
    const rawColumns = localStorage.getItem('columns')
    const rawTasks = localStorage.getItem('tasks')
    if (rawBoards) {
      const boards: IBoard[] = JSON.parse(rawBoards)
      if (Array.isArray(boards)) {
        dispatch(setBoards(boards))
      }
    }
    if (rawColumns) {
      const columns: IColumn[] = JSON.parse(rawColumns)
      if (Array.isArray(columns)) {
        dispatch(setColumns(columns))
      }
    }
    if (rawTasks) {
      const tasks: ITask[] = JSON.parse(rawTasks)
      if (Array.isArray(tasks)) {
        dispatch(setTasks(tasks))
      }
    }
  }, [])

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Intro />} />
        <Route path=':title' element={<ColumnsContainer />} />
      </Route>
    </Routes>
  )
}

export default App
