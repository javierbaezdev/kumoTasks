import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { project } from '@/modules/projects/types'
import { cloneDeep } from '@/shared/utils/cloneDeep'
import { showToast } from '@/shared/utils/sonnerToast'

interface BaseState {
  projects: project[]
  limit: number
}

interface State extends BaseState {
  addProject: (project: project) => void
  updateProject: (project: project) => void
  deleteProject: (currentKey: string) => void
  resetData: (showAlert?: boolean, customMsg?: string) => void
}

const initialValues: BaseState = {
  projects: [],
  limit: 10,
}

export const useProjectsStore = create<State>()(
  devtools(
    persist(
      (set, get) => {
        return {
          ...initialValues,
          addProject: (project) => {
            const { projects, limit } = get()

            if (projects.length === limit) {
              showToast({
                msg: `Solo es posible crear hasta ${limit} proyectos 😖`,
                type: 'warning',
              })
              return
            }

            set({
              projects: [...projects, project],
            })
            showToast({
              msg: 'Proyecto agregado exitosamente 🎉',
              type: 'success',
            })
          },
          updateProject: (project) => {
            const { projects } = get()
            const projectsCopy: project[] = cloneDeep(projects)

            const indexCurrentProject = projectsCopy.findIndex(
              (item) => item.key === project.key
            )

            if (indexCurrentProject > -1) {
              projectsCopy[indexCurrentProject] = project

              set({
                projects: projectsCopy,
              })
              showToast({
                msg: 'Proyecto actualizado exitosamente 🎉',
                type: 'success',
              })
            }
          },
          deleteProject: (currentKey) => {
            const { projects } = get()
            const newProjects: project[] = projects.filter(
              (item) => item.key !== currentKey
            )

            set({
              projects: newProjects,
            })
            showToast({
              msg: 'Proyecto eliminado exitosamente 🎉',
              type: 'success',
            })
          },
          resetData: (showAlert, customMsg) => {
            set({
              ...initialValues,
            })
            if (showAlert) {
              showToast({
                msg: customMsg
                  ? customMsg
                  : `"PROYECTOS" reseteados correctamente 🎉`,
                type: 'success',
              })
            }
          },
        }
      },
      {
        name: 'projects',
      }
    )
  )
)
