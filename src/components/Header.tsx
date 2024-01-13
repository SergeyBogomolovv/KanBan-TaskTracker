import { useParams } from 'react-router'
import Logo from '../images/Logo'
import PlusIcon from '../images/PlusIcon'
import SetupIcon from '../images/SetupIcon'
import { AnimatePresence, motion } from 'framer-motion'
import { useAppDispatch, useAppSelector } from '../store/hooks/redux'
import AddNewTask from './Modals/AddNewTask'
import { openAddNewTask, openEditBoard } from '../store/reducers/windowsSlice'
import EditBoard from './Modals/EditBoard'

const Header = () => {
  const { title } = useParams()
  const { boards } = useAppSelector((state) => state.boards)
  const dispatch = useAppDispatch()
  const currentBoard = boards.find((board) => board.title === title)
  return (
    <>
      <div className='fixed h-[84px] px-5 flex justify-between bg-darkSecond w-full items-center'>
        <div className='flex items-center gap-24'>
          <div className='text-4xl font-bold flex gap-2 items-center'>
            <Logo />
            Task-Tracker
          </div>
          {title ? (
            <div className='text-3xl font-bold'>{title}</div>
          ) : (
            <div className='text-3xl font-bold'>Главная</div>
          )}
        </div>
        <div className='flex items-center gap-5'>
          <AnimatePresence>
            {title && (
              <>
                <motion.button
                  onClick={() => dispatch(openAddNewTask())}
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1, transition: { delay: 0.1 } }}
                  exit={{ x: -100, opacity: 0 }}
                  whileHover={{ scale: 1.05 }}
                  className='bg-uiPurple py-3 px-4 text-xl  rounded-full flex gap-1 items-center'
                >
                  <PlusIcon />
                  Добавить Задачу
                </motion.button>
                <motion.button
                  onClick={() => dispatch(openEditBoard())}
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -100, opacity: 0, transition: { delay: 0.1 } }}
                >
                  <SetupIcon />
                </motion.button>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
      {currentBoard && <AddNewTask board={currentBoard} />}
      {currentBoard && <EditBoard board={currentBoard} />}
    </>
  )
}

export default Header
