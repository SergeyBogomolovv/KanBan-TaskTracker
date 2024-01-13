import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ISubTask, ITask, Id } from '../../assets/types'

interface tasksState {
  tasks: ITask[]
}

const initialState: tasksState = {
  tasks: [],
}
interface changeColumnPayload {
  activeIndex: number
  columnId: Id
}
interface changeTextPayload {
  id: Id
  text: string
}
interface addSubTaskPayload {
  id: Id
  subTask: ISubTask
}

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<ITask>) => {
      state.tasks = [...state.tasks, action.payload]
      localStorage.setItem('tasks', JSON.stringify(state.tasks))
    },
    deleteTask: (state, action: PayloadAction<Id>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload)
      localStorage.setItem('tasks', JSON.stringify(state.tasks))
    },
    setTasks: (state, action: PayloadAction<ITask[]>) => {
      state.tasks = action.payload
      localStorage.setItem('tasks', JSON.stringify(state.tasks))
    },
    changeTaskColumn: (state, action: PayloadAction<changeColumnPayload>) => {
      state.tasks[action.payload.activeIndex].columnId = action.payload.columnId
      localStorage.setItem('tasks', JSON.stringify(state.tasks))
    },
    changeTaskDescription: (
      state,
      action: PayloadAction<changeTextPayload>
    ) => {
      const changingTaskIindex = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      )
      state.tasks[changingTaskIindex].description = action.payload.text
      localStorage.setItem('tasks', JSON.stringify(state.tasks))
    },
    changeTaskTitle: (state, action: PayloadAction<changeTextPayload>) => {
      const changingTaskIindex = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      )
      state.tasks[changingTaskIindex].title = action.payload.text
      localStorage.setItem('tasks', JSON.stringify(state.tasks))
    },
    addSubTask: (state, action: PayloadAction<addSubTaskPayload>) => {
      const changingTaskIindex = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      )
      state.tasks[changingTaskIindex].subTasks = [
        ...state.tasks[changingTaskIindex].subTasks,
        action.payload.subTask,
      ]
      localStorage.setItem('tasks', JSON.stringify(state.tasks))
    },
  },
})

export const {
  addTask,
  deleteTask,
  setTasks,
  changeTaskColumn,
  changeTaskDescription,
  changeTaskTitle,
  addSubTask,
} = tasksSlice.actions
export default tasksSlice.reducer
