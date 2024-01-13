import { IBoard, IColumn } from '../../assets/types'
import Krest from '../../images/Krest'
import { useAppDispatch, useAppSelector } from '../../store/hooks/redux'
import { closeEditBoard } from '../../store/reducers/windowsSlice'
import RPlusIcon from '../../images/RPlusIcon'
import { AnimatePresence, motion } from 'framer-motion'
import { deleteBoard } from '../../store/reducers/boardsSlice'
import { addColumn, deleteColumn } from '../../store/reducers/columnsSlice'
import { v4 as uuidv4 } from 'uuid'
import { deleteTask } from '../../store/reducers/tasksSlice'
import EditColumnTitle from './modalAssets/EditColumnTitleinBoard'
import {
  defaultAnimationAttributes,
  editBoardDialogAnimation,
  includedItemsAnimation,
  modalAnimation,
} from '../../assets/animations'
import EditBoardTitle from './modalAssets/EditBoardTitle'
import { useState } from 'react'
import ActionConfirm from './modalAssets/ActionConfirm'

interface Props {
  board: IBoard
}
const EditBoard = ({ board }: Props) => {
  const dispatch = useAppDispatch()
  const [isDelete, setIsDelete] = useState<boolean>(false)
  const { isEditBoard } = useAppSelector((state) => state.windows)
  const { columns } = useAppSelector((state) => state.columns)
  const currentColumns = columns.filter((col) => col.boardId === board?.id)
  const { tasks } = useAppSelector((state) => state.tasks)
  return (
    <AnimatePresence>
      {isEditBoard && board && (
        <motion.div
          variants={modalAnimation}
          {...defaultAnimationAttributes}
          onClick={() => dispatch(closeEditBoard())}
          className='fixed z-10 top-0 bottom-0 right-0 left-0 w-full h-full bg-modalBg flex items-center justify-center'
        >
          <motion.div
            variants={editBoardDialogAnimation}
            {...defaultAnimationAttributes}
            onClick={(e) => e.stopPropagation()}
            className='bg-darkSecond w-[500px] max-h-[75vh] rounded-xl p-12 flex flex-col gap-6'
          >
            <div className='text-xl mb-2 flex justify-between items-center font-semibold'>
              Параметры доски
              <button
                onClick={() => dispatch(closeEditBoard())}
                className='stroke-darkGray hover:stroke-white'
              >
                <Krest />
              </button>
            </div>

            <div className='p-3 rounded-lg bg-darkBg font-semibold flex items-center justify-between'>
              <EditBoardTitle board={board} />
            </div>
            <div className='font-semibold text-lg'>Колонки:</div>

            <div className='flex flex-col gap-4 overflow-y-auto'>
              <AnimatePresence>
                {currentColumns.map((column) => (
                  <motion.div
                    {...defaultAnimationAttributes}
                    variants={includedItemsAnimation}
                    key={column.id}
                    className='flex justify-between items-center p-3 rounded-lg bg-darkBg'
                  >
                    <EditColumnTitle column={column} />
                    <button
                      onClick={() => deleteCol(column)}
                      className='stroke-darkGray hover:stroke-white '
                    >
                      <Krest />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <motion.button
              onClick={addCol}
              whileTap={{ scale: 0.9 }}
              className='flex items-center gap-2 stroke-black text-black justify-center text-lg font-semibold py-3 bg-white hover:bg-neutral-300 rounded-lg'
            >
              <RPlusIcon /> Добавить колонку
            </motion.button>

            <button
              onClick={() => setIsDelete(true)}
              className='rounded-xl px-4 py-3 bg-red-700 hover:bg-red-950 font-bold text-xl'
            >
              Удалить доску
            </button>
          </motion.div>
        </motion.div>
      )}

      {isDelete && (
        <ActionConfirm
          text='удалить эту доску'
          confirm={() => {
            dispatch(deleteBoard(board.id))
            dispatch(closeEditBoard())
          }}
          cancel={() => setIsDelete(false)}
        />
      )}
    </AnimatePresence>
  )

  function deleteCol(column: IColumn) {
    const tasksToDelete = tasks.filter((task) => task.columnId === column.id)
    tasksToDelete.forEach((task) => dispatch(deleteTask(task.id)))
    dispatch(deleteColumn(column.id))
  }
  function addCol() {
    dispatch(
      addColumn({
        id: uuidv4(),
        title: 'Новая колонка',
        boardId: board.id,
      })
    )
  }
}

export default EditBoard
