import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface State {
  collapse: boolean
  collapseMobile: boolean
  onToggle: () => void
  onToggleMobile: () => void
}

export const useMainLayoutStore = create<State>()(
  devtools(
    persist(
      (set, get) => {
        return {
          collapse: true,
          collapseMobile: false,
          onToggle: () => {
            const { collapse } = get()
            set({
              collapse: !collapse,
            })
          },
          onToggleMobile: () => {
            const { collapseMobile } = get()
            set({
              collapseMobile: !collapseMobile,
            })
          },
        }
      },
      {
        name: 'mainLayout',
      }
    )
  )
)
