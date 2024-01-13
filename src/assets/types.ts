export interface IColumn {
  id: Id
  title: string
  boardId: Id
}
export interface ISubTask {
  id: Id
  text: string
  completed: boolean
}
export interface ITask {
  id: Id
  title: string
  description: string
  columnId: Id
  subTasks: ISubTask[]
}

export interface IBoard {
  id: Id
  title: string
}

export type Id = number | string

export interface IUser {
  id: Id
  name: string
  pass: string
  current: boolean
}
