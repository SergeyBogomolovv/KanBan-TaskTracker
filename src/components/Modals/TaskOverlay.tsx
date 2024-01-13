import { useState } from 'react'
import { ITask, Id } from '../../assets/types'
import { useAppDispatch, useAppSelector } from '../../store/hooks/redux'
import {
  addSubTask,
  changeTaskDescription,
  changeTaskTitle,
  deleteTask,
  setTasks,
} from '../../store/reducers/tasksSlice'
import PenIcon from '../../images/PenIcon'
import EditSubTaskTitle from './modalAssets/EditSubTaskTitle'
import Krest from '../../images/Krest'
import { v4 as uuidv4 } from 'uuid'
import RPlusIcon from '../../images/RPlusIcon'
import { AnimatePresence, motion } from 'framer-motion'
import {
  TaskOverlayAnimation,
  defaultAnimationAttributes,
  includedItemsAnimation,
  modalAnimation,
} from '../../assets/animations'
import ActionConfirm from './modalAssets/ActionConfirm'

interface Props {
  setIsShow: (a: boolean) => void
  task: ITask
}
const TaskOverlay = ({ setIsShow, task }: Props) => {
  const dispatch = useAppDispatch()
  const [editTitleMode, setTitleEditMode] = useState<boolean>(false)
  const [editDescriptionMode, setDescriptionEditMode] = useState<boolean>(false)
  const [isWarning, setIsWarning] = useState<boolean>(false)

  const { tasks } = useAppSelector((state) => state.tasks)

  return (
    <>
      <motion.div
        variants={modalAnimation}
        {...defaultAnimationAttributes}
        onClick={() => setIsShow(false)}
        className='fixed top-0 bottom-0 right-0 left-0 w-full h-full bg-modalBg flex items-center justify-center'
      >
        <motion.div
          variants={TaskOverlayAnimation}
          {...defaultAnimationAttributes}
          onClick={(e) => e.stopPropagation()}
          className='bg-darkSecond rounded-xl p-8 flex flex-col gap-6 w-[500px] max-h-[70vh]'
        >
          {editTitleMode ? (
            <input
              className='bg-transparent focus:outline-none p-0 text-xl font-semibold'
              type='text'
              autoFocus
              onBlur={() => setTitleEditMode(false)}
              value={task.title}
              onChange={(e) =>
                dispatch(changeTaskTitle({ id: task.id, text: e.target.value }))
              }
            />
          ) : (
            <div
              onClick={() => setTitleEditMode(true)}
              className=' cursor-pointer text-xl font-semibold stroke-darkGray flex items-center hover:stroke-white gap-2'
            >
              {task.title}
              <PenIcon className='w-5 h-5' />
            </div>
          )}
          {editDescriptionMode ? (
            <input
              className='bg-transparent focus:outline-none p-0 text-[#7c889c] text-sm font-semibold'
              type='text'
              autoFocus
              onBlur={() => setDescriptionEditMode(false)}
              value={task.description}
              onChange={(e) =>
                dispatch(
                  changeTaskDescription({ id: task.id, text: e.target.value })
                )
              }
            />
          ) : (
            <div
              onClick={() => setDescriptionEditMode(true)}
              className='text-[#7c889c] cursor-pointer text-sm font-semibold stroke-[#7c889c] flex items-center  hover:stroke-white gap-1'
            >
              {task.description}
              <PenIcon className='w-3 h-3' />
            </div>
          )}
          <div className='flex flex-col gap-3 overflow-auto p-1'>
            <div className='font-semibold text-darkGray tracking-widest'>
              Под-Задачи (
              {task.subTasks.filter((task) => task.completed).length} из{' '}
              {task.subTasks.length})
            </div>
            <AnimatePresence>
              {task.subTasks.map((subtask) => (
                <motion.div
                  key={subtask.id}
                  {...defaultAnimationAttributes}
                  variants={includedItemsAnimation}
                  className='flex items-center justify-between rounded-lg bg-darkBg'
                >
                  <div
                    key={subtask.id}
                    className=' p-3 flex items-center gap-3'
                  >
                    <input
                      type='checkbox'
                      checked={subtask.completed}
                      onChange={() =>
                        toggleSubTaskCompleted(subtask.completed, subtask.id)
                      }
                    />
                    <EditSubTaskTitle
                      subtask={subtask}
                      updateSubTaskTitle={updateSubTaskTitle}
                    />
                  </div>
                  <button
                    onClick={() => deleteSubTask(subtask.id)}
                    className='stroke-darkGray hover:stroke-white mr-2'
                  >
                    <Krest />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() =>
              dispatch(
                addSubTask({
                  id: task.id,
                  subTask: {
                    id: uuidv4(),
                    text: 'Название',
                    completed: false,
                  },
                })
              )
            }
            className='rounded-lg stroke-white justify-center flex items-center gap-2 py-3 bg-darkBg  font-semibold'
          >
            <RPlusIcon />
            Добавить подзадачу
          </motion.button>
          <div className='flex flex-col gap-4'>
            <button
              onClick={() => setIsShow(false)}
              className='rounded-xl px-4 py-3 bg-uiPurple hover:bg-[#4b4899] font-bold text-xl'
            >
              Готово
            </button>
            <button
              onClick={() => setIsWarning(true)}
              className='rounded-xl px-4 py-3 bg-red-800 hover:bg-red-950 font-bold text-xl'
            >
              Удалить
            </button>
          </div>
        </motion.div>
      </motion.div>
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
  function toggleSubTaskCompleted(e: boolean, id: Id) {
    const newTasks = tasks.map((t) => {
      const newSubTasks = t.subTasks.map((subtask) => {
        if (subtask.id !== id) return subtask
        return { ...subtask, completed: !e }
      })
      if (t.id !== task.id) return t
      return { ...t, subTasks: newSubTasks }
    })
    dispatch(setTasks(newTasks))
  }

  function updateSubTaskTitle(id: Id, text: string) {
    const newTasks = tasks.map((t) => {
      const newSubTasks = t.subTasks.map((subtask) => {
        if (subtask.id !== id) return subtask
        return { ...subtask, text }
      })
      if (t.id !== task.id) return t
      return { ...t, subTasks: newSubTasks }
    })
    dispatch(setTasks(newTasks))
  }
  function deleteSubTask(id: Id) {
    const newSubtasks = task.subTasks.filter((subTask) => subTask.id !== id)
    const newTasks = tasks.map((t) => {
      if (t.id !== task.id) return t
      return { ...t, subTasks: newSubtasks }
    })
    dispatch(setTasks(newTasks))
  }
}
export default TaskOverlay
