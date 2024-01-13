import { useState } from 'react'
import { ISubTask, Id } from '../../../assets/types'
import PenIcon from '../../../images/PenIcon'
interface Props {
  subtask: ISubTask
  updateSubTaskTitle: (id: Id, text: string) => void
}
const EditSubTaskTitle = ({ subtask, updateSubTaskTitle }: Props) => {
  const [editSubTaskMode, setEditSubTaskMode] = useState<boolean>(false)

  return (
    <>
      {editSubTaskMode ? (
        <input
          type='text'
          autoFocus
          onBlur={() => setEditSubTaskMode(false)}
          value={subtask.text}
          className='bg-transparent focus:outline-none font-bold '
          onChange={(e) => updateSubTaskTitle(subtask.id, e.target.value)}
        />
      ) : (
        <div
          className={
            subtask.completed
              ? 'font-bold text-darkGray line-through overflow-auto cursor-pointer flex items-center gap-2 text-pretty'
              : 'font-bold overflow-auto cursor-pointer flex items-center justify-around gap-2 text-pretty'
          }
          onClick={() => setEditSubTaskMode(true)}
        >
          {subtask.text}
          <PenIcon
            className={
              subtask.completed
                ? 'stroke-darkGray w-[16px] h-[16px]'
                : 'stroke-white w-[16px] h-[16px]'
            }
          />
        </div>
      )}
    </>
  )
}

export default EditSubTaskTitle
