import { NavLink } from 'react-router-dom'
import ColumnIcon from '../images/ColumnIcon'
import NewColumnIcon from '../images/NewColumnIcon'
import EyeSlashed from '../images/EyeSlashed'
import { useAppDispatch, useAppSelector } from '../store/hooks/redux'
import Eye from '../images/Eye'
import { AnimatePresence, motion } from 'framer-motion'
import {
  closeSidebar,
  openAddNewBoard,
  openSidebar,
  setSidebarWidth,
} from '../store/reducers/windowsSlice'
import { useEffect, useRef } from 'react'

interface ActiveFuncProps {
  isActive: boolean
}

const SideBar = () => {
  const Active = ({ isActive }: ActiveFuncProps) =>
    isActive
      ? 'text-xl py-4 bg-uiPurple font-bold pl-5 pr-12 rounded-r-full flex gap-2 items-center hover:bg-white hover:text-black'
      : 'text-xl py-4 bg-transparent font-bold pl-5 pr-12 rounded-r-full flex gap-2 items-center hover:bg-white hover:text-black'
  const dispatch = useAppDispatch()
  const { isSidebar } = useAppSelector((state) => state.windows)
  const { boards } = useAppSelector((state) => state.boards)
  const sidebar = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const w = sidebar.current?.getBoundingClientRect().width
    if (w && isSidebar) {
      dispatch(setSidebarWidth(w))
    }
    if (!isSidebar) {
      dispatch(setSidebarWidth(0))
    }
  }, [isSidebar])

  return (
    <>
      <AnimatePresence>
        {isSidebar && (
          <motion.div
            ref={sidebar}
            initial={{ x: '-100%' }}
            animate={{
              x: 0,
              transition: { type: 'just', duration: 0.2 },
            }}
            exit={{ x: '-100%', transition: { type: 'just', duration: 0.2 } }}
            className='fixed top-[84px] bg-darkSecond h-[100%] min-w-[280px] flex flex-col  py-2 pr-5 overflow-x-hidden'
          >
            <div className=' text-[#bec2cc] px-3 tracking-wide font-bold'>
              ДОСКИ ({boards.length})
            </div>
            <div className='flex flex-col py-5 self-start gap-4 overflow-y-auto flex-grow scrollbar-hide'>
              {boards.map((board) => (
                <NavLink
                  key={board.id}
                  to={`/${board.title}`}
                  className={Active}
                >
                  <ColumnIcon />
                  {board.title}
                </NavLink>
              ))}
              <button
                onClick={() => dispatch(openAddNewBoard())}
                className='text-xl text-[#7976c4] py-4 bg-transparent font-bold pl-5 pr-12 rounded-r-full flex gap-2 items-center hover:bg-white hover:text-black'
              >
                <NewColumnIcon />
                Добавить доску
              </button>
            </div>
            <div className='py-10 mb-[84px]  self-start'>
              <button
                onClick={() => dispatch(closeSidebar())}
                className='flex gap-2 stroke-iconGray text-xl text-iconGray items-center font-bold px-8 rounded-r-full py-4 hover:bg-white hover:text-black hover:stroke-black'
              >
                <EyeSlashed />
                Скрыть меню
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* КНОПКА ПОКАЗАТЬ САЙД БАР */}

      <AnimatePresence>
        {!isSidebar && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0, transition: { type: 'just', duration: 0.2 } }}
            exit={{ x: '-100%', transition: { type: 'just', duration: 0.2 } }}
            className='fixed bottom-[50px]'
          >
            <motion.button
              onClick={() => dispatch(openSidebar())}
              whileHover={{ scale: 1.1 }}
              className='stroke-white bg-darkSecond hover:bg-[#373847] transition-bg duration-100 pl-4 py-3 pr-6 rounded-r-full'
            >
              <Eye />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default SideBar
