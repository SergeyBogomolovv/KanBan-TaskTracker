import { AnimatePresence } from 'framer-motion'
import { useAppDispatch, useAppSelector } from '../../store/hooks/redux'
import { closeAddNewBoard } from '../../store/reducers/windowsSlice'
import { useMemo, useState } from 'react'
import { IColumn, Id } from '../../assets/types'
import { v4 as uuidv4 } from 'uuid'
import TrashIcon from '../../images/TrashIcon'
import RPlusIcon from '../../images/RPlusIcon'
import { addBoard } from '../../store/reducers/boardsSlice'
import { addColumn } from '../../store/reducers/columnsSlice'
import Krest from '../../images/Krest'
import { motion } from 'framer-motion'
import {
  defaultAnimationAttributes,
  includedItemsAnimation,
  modalAnimation,
  newBoardDialogAnimation,
} from '../../assets/animations'

function AddNewBoard() {
  const { isAddNewBoard } = useAppSelector((state) => state.windows)
  const dispatch = useAppDispatch()
  const thisBoardId = useMemo(() => {
    return uuidv4()
  }, [isAddNewBoard])
  const [boardTitle, setBoardTitle] = useState<string>('')
  const [boardColumns, setBoardColumns] = useState<IColumn[]>([])
  const { boards } = useAppSelector((state) => state.boards)

  return (
    <AnimatePresence>
      {isAddNewBoard && (
        <motion.div
          variants={modalAnimation}
          {...defaultAnimationAttributes}
          onClick={() => dispatch(closeAddNewBoard())}
          className='fixed top-0 bottom-0 right-0 left-0 w-full h-full bg-modalBg flex items-center justify-center'
        >
          <motion.div
            variants={newBoardDialogAnimation}
            {...defaultAnimationAttributes}
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
            className='bg-darkSecond w-[500px]  max-h-[75vh] rounded-xl p-12 flex flex-col gap-8'
          >
            <div className='text-xl flex justify-between items-center font-semibold'>
              Добавить новую доску
              <button
                onClick={() => dispatch(closeAddNewBoard())}
                className='stroke-darkGray'
              >
                <Krest />
              </button>
            </div>
            <label className='flex flex-col font-semibold gap-2'>
              Название:
              <input
                type='text'
                value={boardTitle}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setBoardTitle(e.target.value)
                }
                className='modalInput'
                placeholder='Доска задач'
              />
            </label>
            <div className='flex flex-col gap-4 overflow-auto p-1'>
              <div className='font-semibold'>Категории:</div>
              <AnimatePresence>
                {boardColumns.map((col) => (
                  <motion.div
                    variants={includedItemsAnimation}
                    {...defaultAnimationAttributes}
                    className='flex items-center gap-2'
                    key={col.id}
                  >
                    <input
                      type='text'
                      value={col.title}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        changeColTitle(col.id, e.target.value)
                      }}
                      className='modalInput w-full'
                    />
                    <button
                      onClick={() => deleteBoardColumn(col.id)}
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
                onClick={() => addBoardColumn()}
                className='py-3 justify-center px-5 rounded-full hover:bg-[#b5b5b5] bg-white text-uiPurple font-semibold flex items-center gap-2 stroke-uiPurple'
              >
                <RPlusIcon />
                Добавить Категорию
              </button>
              <button
                onClick={() => addBoardHandler()}
                className='py-3 px-5 rounded-full hover:bg-white hover:text-black bg-uiPurple text-white font-bold '
              >
                Создать Доску
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
  function changeColTitle(id: Id, title: string) {
    setBoardColumns((columns) => {
      const newColumns = [...columns]
      const currentCol = newColumns.find((col) => col.id === id)
      if (currentCol) currentCol.title = title
      console.log('change title')
      return newColumns
    })
  }
  function deleteBoardColumn(id: Id) {
    console.log('delte col')
    setBoardColumns((columns) => {
      return columns.filter((col) => col.id !== id)
    })
  }
  function addBoardColumn() {
    console.log('add col')
    setBoardColumns((columns) => {
      return [
        ...columns,
        { id: uuidv4(), title: 'Название', boardId: thisBoardId },
      ]
    })
  }
  function addBoardHandler() {
    if (boards.find((board) => board.title === boardTitle)) {
      alert('Доска с таким именем уже существует!')
      return
    }
    if (boardTitle === '') return
    if (boardTitle.length > 25) {
      alert('Название должно быть менее 25 символов')
      return
    }
    boardColumns.forEach((column) => dispatch(addColumn(column)))
    dispatch(addBoard({ id: thisBoardId, title: boardTitle }))
    dispatch(closeAddNewBoard())
    setBoardColumns([])
    setBoardTitle('')
  }
}

export default AddNewBoard
