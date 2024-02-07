import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { cloneDeep } from '@/shared/utils/cloneDeep'
import { showToast } from '@/shared/utils/sonnerToast'
import { TasksBoard } from '@/modules/tasks/types'
import { arrayMove } from '@dnd-kit/sortable'

interface State {
  tasksBoard: TasksBoard[]
  addTask: (task: TasksBoard) => void
  updateTask: (task: TasksBoard, showAlert: boolean) => void
  deleteTask: (task: string) => void
  sortTask: (
    activeTaskKey: string | number,
    overTaksKey: string | number
  ) => void
  moveTaskToOtherColumn: (
    taskKey: string | number,
    columnKey: string | number
  ) => void
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
          sortTask: (activeTaskKey, overTaskKey) => {
            const { tasksBoard } = get()
            const tasksCopy: TasksBoard[] = cloneDeep(tasksBoard)
            let newTasks: TasksBoard[] = []

            const activeTaskIndex = tasksCopy.findIndex(
              (task) => task.key === activeTaskKey
            )
            const overTaskIndex = tasksCopy.findIndex(
              (task) => task.key === overTaskKey
            )

            if (
              tasksCopy[activeTaskIndex].columnKey !=
              tasksCopy[overTaskIndex].columnKey
            ) {
              tasksCopy[activeTaskIndex].columnKey =
                tasksCopy[overTaskIndex].columnKey

              newTasks = arrayMove(
                tasksCopy,
                activeTaskIndex,
                overTaskIndex - 1
              )
            } else {
              newTasks = arrayMove(tasksCopy, activeTaskIndex, overTaskIndex)
            }

            set({
              tasksBoard: newTasks,
            })
          },
          moveTaskToOtherColumn: (taskKey, columnKey) => {
            const { tasksBoard } = get()
            const tasksCopy: TasksBoard[] = cloneDeep(tasksBoard)

            const activeTaskIndex = tasksCopy.findIndex(
              (task) => task.key === taskKey
            )
            tasksCopy[activeTaskIndex].columnKey = columnKey.toString()

            const newTasks: TasksBoard[] = arrayMove(
              tasksCopy,
              activeTaskIndex,
              activeTaskIndex
            )

            set({
              tasksBoard: newTasks,
            })
          },
        }
      },
      {
        name: 'tasks',
      }
    )
  )
)
