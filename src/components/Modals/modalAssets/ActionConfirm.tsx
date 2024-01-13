import { motion } from 'framer-motion'
import {
  defaultAnimationAttributes,
  warningAnimation,
} from '../../../assets/animations'
interface Props {
  text: string
  confirm: () => void
  cancel: () => void
}
const ActionConfirm = ({ text, confirm, cancel }: Props) => {
  return (
    <motion.div
      variants={warningAnimation}
      {...defaultAnimationAttributes}
      className='fixed z-50 top-0 bottom-0 right-0 left-0 w-full h-full flex items-center justify-center '
    >
      <div className='bg-darkSecond rounded-xl p-10 w-[400px] flex flex-col items-center gap-8 ring-red-500 ring-4 shadow-2xl shadow-black'>
        <div className='font-bold text-2xl '>
          Вы уверенны что хотите {text} ?
        </div>
        <div className='grid grid-cols-2 gap-6'>
          <motion.button
            onClick={() => cancel()}
            whileTap={{ scale: 0.9 }}
            className='p-4 bg-darkGray rounded-lg font-bold'
          >
            Отмена
          </motion.button>
          <motion.button
            onClick={() => confirm()}
            whileTap={{ scale: 0.9 }}
            className='p-4 bg-red-500 rounded-lg hover:bg-red-700'
          >
            Подтвердить
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

export default ActionConfirm
