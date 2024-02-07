import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { cloneDeep } from '@/shared/utils/cloneDeep'
import { showToast } from '@/shared/utils/sonnerToast'
import { ColumnsBoard } from '@/modules/boards/types'
import { arrayMove } from '@dnd-kit/sortable'

interface State {
  columnsBoard: ColumnsBoard[]
  limit: number
  addColumn: (column: ColumnsBoard) => void
  updateColumn: (column: ColumnsBoard) => void
  deleteColumn: ({
    columnKey,
    projectKey,
  }: {
    columnKey?: string
    projectKey?: string
  }) => void
  sortColumns: (
    activeColumnKey: string | number,
    overColumnKey: string | number
  ) => void
}

export const useBoardsStore = create<State>()(
  devtools(
    persist(
      (set, get) => {
        return {
          columnsBoard: [],
          limit: 6,
          addColumn: (column) => {
            const { columnsBoard, limit } = get()

            if (columnsBoard.length === limit) {
              showToast({
                msg: `Solo es posible crear hasta ${limit} columnas 😖`,
                type: 'warning',
              })
              return
            }

            set({
              columnsBoard: [...columnsBoard, column],
            })
            showToast({
              msg: 'Columna agregada exitosamente 🎉',
              type: 'success',
            })
          },
          updateColumn: (column) => {
            const { columnsBoard } = get()
            const columnsCopy: ColumnsBoard[] = cloneDeep(columnsBoard)

            const indexCurrentColumn = columnsCopy.findIndex(
              (item) => item.key === column.key
            )

            if (indexCurrentColumn > -1) {
              columnsCopy[indexCurrentColumn] = column

              set({
                columnsBoard: columnsCopy,
              })
            }
          },
          deleteColumn: ({ columnKey, projectKey }) => {
            const { columnsBoard } = get()
            let newColumns: ColumnsBoard[] = []

            if (columnKey) {
              newColumns = columnsBoard.filter((item) => item.key !== columnKey)
            }

            if (projectKey) {
              newColumns = columnsBoard.filter(
                (item) => item.projectKey !== projectKey
              )
            }

            set({
              columnsBoard: newColumns,
            })

            if (!projectKey) {
              showToast({
                msg: 'Columna eliminada exitosamente 🎉',
                type: 'success',
              })
            }
          },
          sortColumns: (activeColumnKey, overColumnKey) => {
            const { columnsBoard } = get()

            const activeColumnIndex = columnsBoard.findIndex(
              (col) => col.key === activeColumnKey
            )
            const overColumnIndex = columnsBoard.findIndex(
              (col) => col.key === overColumnKey
            )

            const newColumns = arrayMove(
              columnsBoard,
              activeColumnIndex,
              overColumnIndex
            )
            set({
              columnsBoard: newColumns,
            })
          },
        }
      },
      {
        name: 'columns',
      }
    )
  )
)
