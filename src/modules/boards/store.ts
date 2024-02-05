import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { cloneDeep } from '@/shared/utils/cloneDeep'
import { showToast } from '@/shared/utils/sonnerToast'
import { ColumnsBoard } from '@/modules/boards/types'

interface State {
  columnsBoard: ColumnsBoard[]
  limit: number
  addColumn: (column: ColumnsBoard) => void
  updateColumn: (column: ColumnsBoard) => void
  deleteColumn: (column: string) => void
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
              showToast({
                msg: 'Columna actualizada exitosamente 🎉',
                type: 'success',
              })
            }
          },
          deleteColumn: (currentKey) => {
            const { columnsBoard } = get()
            const newColumns: ColumnsBoard[] = columnsBoard.filter(
              (item) => item.key !== currentKey
            )

            set({
              columnsBoard: newColumns,
            })
            showToast({
              msg: 'Columna eliminada exitosamente 🎉',
              type: 'success',
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
