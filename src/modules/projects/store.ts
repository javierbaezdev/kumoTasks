import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { project } from '@/modules/projects/types'
import { cloneDeep } from '@/shared/utils/cloneDeep'

interface State {
  projects: project[]
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
          addProject: (project) => {
            const { projects } = get()
            set({
              projects: [...projects, project],
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
          },
        }
      },
      {
        name: 'projects',
      }
    )
  )
)
