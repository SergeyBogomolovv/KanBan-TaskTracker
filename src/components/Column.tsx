import { IColumn } from '../assets/types'
import { useAppDispatch, useAppSelector } from '../store/hooks/redux'
import Krest from '../images/Krest'
import { changeColumnTitle, deleteColumn } from '../store/reducers/columnsSlice'
import { useMemo, useState } from 'react'
import { deleteTask } from '../store/reducers/tasksSlice'
import { SortableContext, useSortable } from '@dnd-kit/sortable'
import Task from './Task'
import { AnimatePresence } from 'framer-motion'
import ActionConfirm from './Modals/modalAssets/ActionConfirm'

interface Props {
  column: IColumn
}

function Column({ column }: Props) {
  const { tasks } = useAppSelector((state) => state.tasks)
  const dispatch = useAppDispatch()
  const currentTasks = tasks.filter((task) => task.columnId === column.id)
  const [isWarning, setIsWarning] = useState<boolean>(false)
  const currentTasksId = useMemo(() => {
    return currentTasks.map((task) => task.id)
  }, [currentTasks])
  const [editMode, setEditMode] = useState<boolean>(false)
  const { setNodeRef } = useSortable({
    id: column.id,
    data: { type: 'Column', column },
  })

  return (
    <>
      <div
        ref={setNodeRef}
        className='min-h-[87svh] h-auto flex flex-col border-r-2 border-[#2b2c37] w-[350px]'
      >
        <div className='text-darkGray text-lg mb-4 tracking-widest font-semibold flex justify-between items-center p-2'>
          {editMode ? (
            <div className='cursor-pointer '>
              <input
                className='focus:outline-none bg-transparent p-0 w-fit tracking-widest'
                type='text'
                autoFocus
                value={column.title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch(
                    changeColumnTitle({ id: column.id, text: e.target.value })
                  )
                }
                onBlur={() => {
                  setEditMode(false)
                }}
              />
            </div>
          ) : (
            <div
              onClick={() => setEditMode(true)}
              className='cursor-pointer overflow-x-auto flex items-center gap-2'
            >
              {column.title} ({currentTasks.length})
            </div>
          )}
          <button
            onClick={() => {
              setIsWarning(true)
            }}
            className='flex gap-2 items-center stroke-darkGray'
          >
            <Krest />
          </button>
        </div>

        <div className='overflow-y-auto gap-4 flex flex-col'>
          <SortableContext items={currentTasksId}>
            {currentTasks.map((task) => (
              <Task key={task.id} task={task} />
            ))}
          </SortableContext>
        </div>
      </div>
      <AnimatePresence>
        {isWarning && (
          <ActionConfirm
            text={`удалить ${column.title}`}
            confirm={() => {
              const tasksToDelete = tasks.filter(
                (task) => task.columnId === column.id
              )
              tasksToDelete.forEach((task) => dispatch(deleteTask(task.id)))
              dispatch(deleteColumn(column.id))
            }}
            cancel={() => setIsWarning(false)}
          />
        )}
      </AnimatePresence>
    </>
  )
}

export default Column
