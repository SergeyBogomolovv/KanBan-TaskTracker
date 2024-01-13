import { useMemo, useState } from 'react'
import Pen from '../../../images/Pen'
import { IBoard } from '../../../assets/types'
import { changeBoardTitle } from '../../../store/reducers/boardsSlice'
import { useAppDispatch, useAppSelector } from '../../../store/hooks/redux'
import { useNavigate } from 'react-router'

interface Props {
  board: IBoard
}

const EditBoardTitle = ({ board }: Props) => {
  const [editTitleMode, setEditTitleMode] = useState<boolean>(false)
  const [newBoardTitle, setNewBoardTitle] = useState<string>(board?.title)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { boards } = useAppSelector((state) => state.boards)

  const similarBoard = useMemo(() => {
    return boards.find((board) => board.title === newBoardTitle)
  }, [newBoardTitle, boards])
  if (similarBoard) {
    console.log(similarBoard)
  }
  return (
    <>
      <div className='flex items-center gap-2'>
        <div>Название:</div>{' '}
        {editTitleMode ? (
          <input
            type='text'
            value={newBoardTitle}
            onChange={(e) => {
              setNewBoardTitle(e.target.value)
            }}
            autoFocus
            onBlur={(e) => {
              if (newBoardTitle.length > 25) {
                alert('Название не может быть больше 25 символов')
                setNewBoardTitle(board.title)
                setEditTitleMode(false)
                return
              }
              if (newBoardTitle.length === 0) {
                alert('Название не может быть пустым')
                setNewBoardTitle(board.title)
                setEditTitleMode(false)
                return
              }
              navigate(e.target.value)
              changeBoard(e.target.value)
            }}
            className='p-0 bg-transparent focus:outline-none'
          />
        ) : (
          <div>{board?.title}</div>
        )}
      </div>
      {!editTitleMode && (
        <button
          onClick={() => setEditTitleMode(true)}
          className='stroke-white d'
        >
          <Pen />
        </button>
      )}
    </>
  )
  function changeBoard(text: string) {
    dispatch(
      changeBoardTitle({
        id: board?.id,
        text,
      })
    )
    setEditTitleMode(false)
  }
}

export default EditBoardTitle
