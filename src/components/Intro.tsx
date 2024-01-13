import { motion } from 'framer-motion'
import { useAppDispatch, useAppSelector } from '../store/hooks/redux'
import { Link, Navigate } from 'react-router-dom'
import { addBoard } from '../store/reducers/boardsSlice'
import { v4 as uuidv4 } from 'uuid'
import FramerLogo from '../images/FramerLogo'
import ReactLogo from '../images/ReactLogo'
import ReduxLogo from '../images/ReduxLogo'
import TSLogo from '../images/TSLogo'
import Routerlogo from '../images/Routerlogo'
import TailwindLogo from '../images/TailwindLogo'

export default function Intro() {
  const { sidebarWidth, isSidebar } = useAppSelector((state) => state.windows)
  const dispatch = useAppDispatch()
  const { boards } = useAppSelector((state) => state.boards)
  const redirectBoard = boards.find((board) => board.title)
  const firstBoard = {
    id: uuidv4(),
    title: 'Первая доска',
  }

  return (
    <>
      {boards.length && redirectBoard ? (
        <Navigate to={redirectBoard?.title} />
      ) : (
        <motion.div
          className='mt-[84px] p-16 h-[86svh]'
          animate={
            isSidebar
              ? {
                  marginLeft: sidebarWidth,
                  transition: { type: 'just', duration: 0.2 },
                }
              : { marginLeft: 0 }
          }
        >
          <Link
            onClick={() => dispatch(addBoard(firstBoard))}
            to={`/${firstBoard.title}`}
            className='grid grid-cols-3 transition-all duration-500 hover:border-white p-10 border-4 rounded-xl h-full border-darkGray hover:text-white text-darkGray hover:cursor-pointer'
          >
            <div className='flex flex-col justify-around items-center gap-10'>
              <motion.div
                initial={{ x: -300, y: -100, scale: 0, opacity: 0 }}
                animate={{ x: 0, y: 0, scale: 1, opacity: 1 }}
                transition={{ duration: 2, type: 'spring' }}
              >
                <ReactLogo />
              </motion.div>
              <motion.div
                initial={{ x: -300, scale: 0, opacity: 0 }}
                animate={{ x: 0, scale: 1, opacity: 1 }}
                transition={{ duration: 2, type: 'spring' }}
              >
                <Routerlogo />
              </motion.div>
              <motion.div
                initial={{ x: -300, y: 100, scale: 0, opacity: 0 }}
                animate={{ x: 0, y: 0, scale: 1, opacity: 1 }}
                transition={{ duration: 2, type: 'spring' }}
              >
                <FramerLogo />
              </motion.div>
            </div>

            <div className='flex flex-col gap-10 items-center justify-center'>
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 2, type: 'spring' }}
                className='text-5xl font-extrabold text-white text-center'
              >
                Добро пожаловать в менеджер задач
              </motion.div>

              <motion.div
                initial={{ y: 100, opacity: 0, scale: 0 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ delay: 0.75, duration: 1.5, type: 'spring' }}
                className='text-xl font-bold text-center'
              >
                Добавьте новую доску, нажав на это окно, или кликните на кнопку
                в левом нижнем углу
              </motion.div>
            </div>

            <div className='flex flex-col justify-around items-center gap-10'>
              <motion.div
                initial={{ x: 300, y: -100, scale: 0, opacity: 0 }}
                animate={{ x: 0, y: 0, scale: 1, opacity: 1 }}
                transition={{ duration: 2, type: 'spring' }}
              >
                <TSLogo />
              </motion.div>
              <motion.div
                initial={{ x: 300, scale: 0, opacity: 0 }}
                animate={{ x: 0, scale: 1, opacity: 1 }}
                transition={{ duration: 2, type: 'spring' }}
              >
                <TailwindLogo />
              </motion.div>
              <motion.div
                initial={{ x: 300, y: 100, scale: 0, opacity: 0 }}
                animate={{ x: 0, y: 0, scale: 1, opacity: 1 }}
                transition={{ duration: 2, type: 'spring' }}
              >
                <ReduxLogo />
              </motion.div>
            </div>
          </Link>
        </motion.div>
      )}
    </>
  )
}
