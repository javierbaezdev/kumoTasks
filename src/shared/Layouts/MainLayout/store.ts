import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface State {
  collapse: boolean
  onToggle: () => void
}

export const useMainLayoutStore = create<State>()(
  devtools(
    persist(
      (set, get) => {
        return {
          collapse: true,
          onToggle: () => {
            const { collapse } = get()
            set({
              collapse: !collapse,
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
