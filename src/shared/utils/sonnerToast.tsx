import { COMBINED_COLORS } from '@/theme/combinedColors'
import { toast } from 'sonner'

const getBasicStyles = (colorMode: string | null) => {
  let styles = {
    background: COMBINED_COLORS.dark.primary[300],
    color: '#ffffff',
    fontSize: '0.9rem',
    border: 'none',
    justifyContent: 'center',
  }

  if (colorMode === 'light') {
    styles = {
      ...styles,
      background: COMBINED_COLORS.light.primary[100],
      color: '#060113',
    }
  }

  return styles
}

const typeToastDict: Record<string, any> = {
  success: (msg: string, colorMode: string | null) =>
    toast.success(msg, {
      style: {
        ...getBasicStyles(colorMode),
      },
    }),
  error: (msg: string, colorMode: string | null) =>
    toast.error(msg, {
      style: {
        ...getBasicStyles(colorMode),
      },
    }),
  warning: (msg: string, colorMode: string | null) =>
    toast.warning(msg, {
      style: {
        ...getBasicStyles(colorMode),
      },
    }),
}

interface props {
  msg: string
  type: 'success' | 'error' | 'warning'
}

export const showToast = ({ msg, type }: props) => {
  const colorMode: string | null = localStorage.getItem('chakra-ui-color-mode')
  typeToastDict[type](msg, colorMode)
}
