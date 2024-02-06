import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { cloneDeep } from '@/shared/utils/cloneDeep'
import { showToast } from '@/shared/utils/sonnerToast'
import { TasksBoard } from '@/modules/tasks/types'

interface State {
  tasksBoard: TasksBoard[]
  addTask: (task: TasksBoard) => void
  updateTask: (task: TasksBoard, showAlert: boolean) => void
  deleteTask: (task: string) => void
  /* sortTask: (
    activeColumnKey: string | number,
    overColumnKey: string | number
  ) => void */
}

export const useTasksStore = create<State>()(
  devtools(
    persist(
      (set, get) => {
        return {
          tasksBoard: [],
          addTask: (task) => {
            const { tasksBoard } = get()

            set({
              tasksBoard: [...tasksBoard, task],
            })
            showToast({
              msg: 'Tarea agregada exitosamente 🎉',
              type: 'success',
            })
          },
          updateTask: (task, showAlert = true) => {
            const { tasksBoard } = get()
            const tasksCopy: TasksBoard[] = cloneDeep(tasksBoard)

            const indexCurrentTask = tasksCopy.findIndex(
              (item) => item.key === task.key
            )

            if (indexCurrentTask > -1) {
              tasksCopy[indexCurrentTask] = task

              set({
                tasksBoard: tasksCopy,
              })
              if (showAlert) {
                showToast({
                  msg: 'Tarea actualizada exitosamente 🎉',
                  type: 'success',
                })
              }
            }
          },
          deleteTask: (currentKey) => {
            const { tasksBoard } = get()
            const newTasks: TasksBoard[] = tasksBoard.filter(
              (item) => item.key !== currentKey
            )

            set({
              tasksBoard: newTasks,
            })
            showToast({
              msg: 'Tarea eliminada exitosamente 🎉',
              type: 'success',
            })
          },
          /* sortColumns: (activeColumnKey, overColumnKey) => {
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
          }, */
        }
      },
      {
        name: 'tasks',
      }
    )
  )
)
