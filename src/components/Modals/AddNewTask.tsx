import React, { useState } from 'react'
import { IBoard, ISubTask, Id } from '../../assets/types'
import { useAppDispatch, useAppSelector } from '../../store/hooks/redux'
import { AnimatePresence } from 'framer-motion'
import { closeAddNewTask } from '../../store/reducers/windowsSlice'
import TrashIcon from '../../images/TrashIcon'
import RPlusIcon from '../../images/RPlusIcon'
import { v4 as uuidv4 } from 'uuid'
import { addTask } from '../../store/reducers/tasksSlice'
import Krest from '../../images/Krest'
import { motion } from 'framer-motion'
import {
  defaultAnimationAttributes,
  includedItemsAnimation,
  modalAnimation,
  newTaskDialogAnimation,
} from '../../assets/animations'

interface Props {
  board: IBoard
}

export default function AddNewTask({ board }: Props) {
  const { isAddNewTask } = useAppSelector((state) => state.windows)
  const { columns } = useAppSelector((state) => state.columns)
  const currentColumns = columns.filter((col) => col.boardId === board?.id)
  const dispatch = useAppDispatch()
  const [taskTitle, setTaskTitle] = useState<string>('')
  const [taskDescription, setTaskDescription] = useState<string>('')
  const [subTasks, setSubTasks] = useState<ISubTask[]>([])
  const [taskColumnId, setTaskColumnId] = useState<string>('')

  if (currentColumns.length === 0) {
    dispatch(closeAddNewTask())
  }

  return (
    <AnimatePresence>
      {isAddNewTask && (
        <motion.div
          variants={modalAnimation}
          {...defaultAnimationAttributes}
          onClick={() => dispatch(closeAddNewTask())}
          className='z-10 fixed top-0 bottom-0  right-0 left-0 w-full h-full bg-modalBg flex items-center justify-center'
        >
          <motion.div
            variants={newTaskDialogAnimation}
            {...defaultAnimationAttributes}
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
            className='bg-darkSecond w-[500px] overflow-auto max-h-[85vh] rounded-xl p-12 flex flex-col gap-8'
          >
            <div className='text-xl flex justify-between items-center font-semibold'>
              Добавить новую задачу
              <button
                onClick={() => dispatch(closeAddNewTask())}
                className='stroke-darkGray'
              >
                <Krest />
              </button>
            </div>
            <label className='flex flex-col font-semibold gap-2'>
              Название:
              <input
                type='text'
                value={taskTitle}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setTaskTitle(e.target.value)
                }
                className='modalInput'
                placeholder='Новая задача'
              />
            </label>
            <label className='flex flex-col font-semibold gap-2'>
              Описание:
              <textarea
                value={taskDescription}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setTaskDescription(e.target.value)
                }
                className='modalInput  min-h-[80px]'
                placeholder='Описание задачи'
              />
            </label>
            <label className='flex flex-col font-semibold gap-2'>
              Категория:
              <select
                autoFocus
                onBlur={(e) => setTaskColumnId(e.target.value)}
                onChange={(e) => setTaskColumnId(e.target.value)}
                className='px-3 text-sm py-2 font-medium bg-transparent focus:outline-none focus:ring-uiPurple text-white rounded ring-1 ring-darkGray'
              >
                {currentColumns.map((col) => (
                  <option value={col.id}>{col.title}</option>
                ))}
              </select>
            </label>
            <div className='flex flex-col gap-4 overflow-y-auto  p-1'>
              <div className='font-semibold'>Под-задачи:</div>
              <AnimatePresence>
                {subTasks.map((subT) => (
                  <motion.div
                    variants={includedItemsAnimation}
                    {...defaultAnimationAttributes}
                    className='flex items-center gap-2 '
                    key={subT.id}
                  >
                    <input
                      type='text'
                      value={subT.text}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        changeSubTaskTitle(subT.id, e.target.value)
                      }}
                      className='modalInput w-full'
                    />
                    <button
                      onClick={() => deleteSubTask(subT.id)}
                      className='stroke-darkGray hover:stroke-white'
                    >
                      <TrashIcon />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            <div className='flex flex-col gap-4'>
              <button
                onClick={() => addSubTask()}
                className='py-3 px-5 rounded-full justify-center hover:bg-[#b5b5b5] bg-white text-uiPurple font-semibold flex items-center gap-2 stroke-uiPurple'
              >
                <RPlusIcon />
                Добавить под-задачу
              </button>
              <button
                onClick={() => addTaskHandler()}
                className='py-3 px-5 rounded-full hover:bg-white hover:text-black bg-uiPurple text-white font-bold '
              >
                Создать Задачу
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
  function changeSubTaskTitle(id: Id, text: string) {
    setSubTasks((tasks) => {
      const newSubTasks = [...tasks]
      const currentT = newSubTasks.find((t) => t.id === id)
      if (currentT) currentT.text = text
      return newSubTasks
    })
  }
  function deleteSubTask(id: Id) {
    setSubTasks((subTasks) => {
      return subTasks.filter((subT) => subT.id !== id)
    })
  }
  function addSubTask() {
    setSubTasks((subTasks) => {
      return [...subTasks, { id: uuidv4(), text: 'Название', completed: false }]
    })
  }
  function addTaskHandler() {
    if (taskTitle === '' || subTasks.length === 0) return
    dispatch(
      addTask({
        id: uuidv4(),
        title: taskTitle,
        description: taskDescription,
        subTasks: subTasks,
        columnId: taskColumnId,
      })
    )
    dispatch(closeAddNewTask())
    setTaskDescription('')
    setTaskTitle('')
    setSubTasks([])
  }
}
