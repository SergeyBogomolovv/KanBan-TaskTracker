import { useState } from 'react'
import { ITask } from '../assets/types'
import { useAppDispatch } from '../store/hooks/redux'
import { deleteTask } from '../store/reducers/tasksSlice'
import TrashIcon from '../images/TrashIcon'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import TaskOverlay from './Modals/TaskOverlay'
import { AnimatePresence } from 'framer-motion'
import ActionConfirm from './Modals/modalAssets/ActionConfirm'

interface Props {
  task: ITask
}

const Task = ({ task }: Props) => {
  const [isShow, setIsShow] = useState<boolean>(false)
  const [isWarning, setIsWarning] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: 'Task',
      task,
    },
    transition: null,
  })

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  }
  return (
    <>
      <AnimatePresence>
        {isShow && <TaskOverlay setIsShow={setIsShow} task={task} />}
      </AnimatePresence>

      {isDragging ? (
        <div
          ref={setNodeRef}
          style={style}
          className='flex h-[100px] items-center justify-between px-3 py-6 rounded-lg bg-darkSecond w-[300px] border-2 border-dashed border-uiPurple opacity-65'
        ></div>
      ) : (
        <div
          ref={setNodeRef}
          style={style}
          {...attributes}
          {...listeners}
          onClick={() => setIsShow(true)}
          className='flex shadow-[#364e7e1a] shadow-lg min-h-[100px] items-center justify-between px-3 py-6 rounded-lg bg-darkSecond w-[300px] hover:bg-[#404254] cursor-pointer'
        >
          <div className='flex flex-col gap-2 overflow-x-auto'>
            <div className='font-semibold '>{task.title}</div>
            <div className='text-darkGray text-xs font-semibold tracking-tighter'>
              {task.subTasks.filter((task) => task.completed).length} из{' '}
              {task.subTasks.length} выполненных под-задач
            </div>
          </div>

          <button
            onClick={(e) => {
              setIsWarning(true)
              e.stopPropagation()
            }}
            className='pl-4 stroke-darkGray cursor-pointer hover:stroke-white'
          >
            <TrashIcon />
          </button>
        </div>
      )}
      <AnimatePresence>
        {isWarning && (
          <ActionConfirm
            text={`удалить ${task.title}`}
            confirm={() => dispatch(deleteTask(task.id))}
            cancel={() => setIsWarning(false)}
          />
        )}
      </AnimatePresence>
    </>
  )
}
export default Task
