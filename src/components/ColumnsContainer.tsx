import AddColumnIcon from '../images/AddColumnIcon'
import { useAppDispatch, useAppSelector } from '../store/hooks/redux'
import { Navigate, useParams } from 'react-router'
import { addColumn } from '../store/reducers/columnsSlice'
import { v4 as uuidv4 } from 'uuid'
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { createPortal } from 'react-dom'
import { useState } from 'react'
import { ITask } from '../assets/types'
import { arrayMove } from '@dnd-kit/sortable'
import { changeTaskColumn, setTasks } from '../store/reducers/tasksSlice'
import Task from './Task'
import Column from './Column'
import { motion } from 'framer-motion'

function ColumnsContainer() {
  const { sidebarWidth, isSidebar } = useAppSelector((state) => state.windows)
  const { title } = useParams()
  const dispatch = useAppDispatch()
  const { boards } = useAppSelector((state) => state.boards)
  const { columns } = useAppSelector((state) => state.columns)
  const { tasks } = useAppSelector((state) => state.tasks)
  const currentBoard = boards.find((board) => board.title === title)
  const [activeTask, setActiveTask] = useState<ITask>()
  const currentColumns = columns.filter(
    (column) => column.boardId === currentBoard?.id
  )
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 3 } }),
    useSensor(TouchSensor, { activationConstraint: { distance: 3 } })
  )

  return (
    <>
      {currentBoard ? (
        <motion.div
          className='flex overflow-auto scrollbar-hide mt-[84px]'
          animate={
            isSidebar
              ? {
                  marginLeft: sidebarWidth,
                  transition: { type: 'just', duration: 0.2 },
                }
              : { marginLeft: 0 }
          }
        >
          <DndContext
            sensors={sensors}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onDragOver={onDragOver}
          >
            <div className='p-5 flex gap-4'>
              {currentColumns.map((column) => (
                <Column column={column} key={column.id} />
              ))}
              <motion.button
                onClick={addNewColumn}
                className='flex min-h-[87svh] items-center justify-center text-2xl gap-1 text-darkGray font-bold bg-[#2b2c3740] p-10 w-[300px] rounded hover:bg-darkSecond'
              >
                <AddColumnIcon /> Добавить
              </motion.button>
            </div>
            {createPortal(
              <DragOverlay>
                {activeTask && <Task task={activeTask} />}
              </DragOverlay>,
              document.body
            )}
          </DndContext>
        </motion.div>
      ) : (
        <Navigate to='/' />
      )}
    </>
  )
  function addNewColumn() {
    if (currentBoard) {
      dispatch(
        addColumn({ id: uuidv4(), title: 'Название', boardId: currentBoard.id })
      )
    }
  }
  function onDragStart(e: DragStartEvent) {
    if (e.active.data.current?.type === 'Task') {
      setActiveTask(e.active.data.current.task)
      return
    }
  }
  function onDragEnd(e: DragEndEvent) {
    setActiveTask(undefined)
    const { active, over } = e
    if (!over) return
    if (active.id === over.id) return
    const activeTaskIndex = tasks.findIndex((task) => task.id === active.id)
    const overTaskIndex = tasks.findIndex((task) => task.id === over.id)
    dispatch(setTasks(arrayMove(tasks, activeTaskIndex, overTaskIndex)))
  }
  function onDragOver(e: DragOverEvent) {
    const { active, over } = e
    if (!over) return
    if (active.id === over.id) return

    const isActiveATask = active.data.current?.type === 'Task'
    const isOverAColumn = over.data.current?.type === 'Column'
    const isOverATask = over.data.current?.type === 'Task'

    if (isActiveATask && isOverAColumn) {
      const activeTaskIndex = tasks.findIndex((task) => task.id === active.id)
      if (active.data.current?.task.columnId === over.data.current?.column.id) {
        return
      }
      dispatch(
        changeTaskColumn({
          activeIndex: activeTaskIndex,
          columnId: over.id,
        })
      )
    }
    if (isOverATask && isActiveATask) {
      const activeTaskIndex = tasks.findIndex((task) => task.id === active.id)
      if (
        active.data.current?.task.columnId === over.data.current?.task.columnId
      ) {
        return
      }
      dispatch(
        changeTaskColumn({
          activeIndex: activeTaskIndex,
          columnId: over.data.current?.task.columnId,
        })
      )
    }
  }
}

export default ColumnsContainer
