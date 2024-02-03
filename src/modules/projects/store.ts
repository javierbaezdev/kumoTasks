import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { project, StateTypes } from '@/modules/projects/types'
import { useId } from 'react'
import { cloneDeep } from '@/shared/utils/cloneDeep'

interface State {
  projects: project[]
  addProject: () => void
  updateProject: (
    fieldName: string,
    currentKey: string,
    newValue?: string | StateTypes
  ) => void
  deleteProject: (currentKey: string) => void
}

export const useProjectsStore = create<State>()(
  devtools(
    persist(
      (set, get) => {
        return {
          projects: [],
          addProject: () => {
            const key = useId()
            const { projects } = get()

            const newItem: project = {
              key,
              name: 'Nuevo proyecto',
              description: undefined,
              state: 'ACTIVE',
            }

            set({
              projects: [...projects, newItem],
            })
          },
          updateProject: (fieldName, currentKey, newValue) => {
            const { projects } = get()
            const projectsCopy: project[] = cloneDeep(projects)

            const indexCurrentProject = projectsCopy.findIndex(
              (item) => item.key === currentKey
            )

            if (indexCurrentProject > -1) {
              projectsCopy[indexCurrentProject] = {
                ...projectsCopy[indexCurrentProject],
                [fieldName]: newValue,
              }

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
