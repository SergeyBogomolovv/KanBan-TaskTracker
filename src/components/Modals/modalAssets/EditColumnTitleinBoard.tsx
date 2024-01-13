import { useState } from 'react'
import { IColumn } from '../../../assets/types'
import PenIcon from '../../../images/PenIcon'
import { useAppDispatch } from '../../../store/hooks/redux'
import { changeColumnTitle } from '../../../store/reducers/columnsSlice'
interface Props {
  column: IColumn
}
const EditColumnTitle = ({ column }: Props) => {
  const [editColumnMode, setEditColumnMode] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  return (
    <>
      {editColumnMode ? (
        <div className='flex gap-2 items-center font-bold'>
          <input
            type='text'
            autoFocus
            onBlur={() => setEditColumnMode(false)}
            value={column.title}
            className='bg-transparent focus:outline-none font-bold p-0 border-0'
            onChange={(e) =>
              dispatch(
                changeColumnTitle({ id: column.id, text: e.target.value })
              )
            }
          />
        </div>
      ) : (
        <div
          onClick={() => setEditColumnMode(true)}
          className='flex gap-2 items-center font-bold cursor-pointer'
        >
          {column.title}
          <PenIcon className='w-4 h-4 stroke-white' />
        </div>
      )}
    </>
  )
}

export default EditColumnTitle
