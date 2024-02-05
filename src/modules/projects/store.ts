import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { project } from '@/modules/projects/types'
import { cloneDeep } from '@/shared/utils/cloneDeep'
import { showToast } from '@/shared/utils/sonnerToast'

interface State {
  projects: project[]
  limit: number
  addProject: (project: project) => void
  updateProject: (project: project) => void
  deleteProject: (currentKey: string) => void
}

export const useProjectsStore = create<State>()(
  devtools(
    persist(
      (set, get) => {
        return {
          projects: [],
          limit: 10,
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
        }
      },
      {
        name: 'projects',
      }
    )
  )
)
