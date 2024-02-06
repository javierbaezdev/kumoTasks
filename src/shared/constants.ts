import { useColorMode } from '@chakra-ui/react'
import { useMediaQuery } from 'react-responsive'

export const FAKE_DELAY_ROUTER = 600

export const NO_DATA = {
  description: 'Sin descripción 🤐',
}

export const SCHEMA_MESSAGES = {
  required: 'El campo es requerido',
  minNum: 'El valor debe ser mayor o igual a: ',
  maxNum: 'El valor debe ser menor o igual a: ',
  isNumber: 'El valor ingresado debe ser un número',
  email: 'Ingrese una dirección de correo electrónico válida',
  atLeastOne: 'Se requiere al menos un elemento en la lista',
}

export const GRADIENTS_BG = {
  DARK: 'linear-gradient(270deg, rgba(27,29,42,0.4761554279915091) 0%, rgba(12,15,29,1) 100%)',
  LIGHT:
    'linear-gradient(270deg, rgba(255,255,255,0.5713935232296043) 0%, rgba(229,231,244,1) 100%)',
}

export const GET_COLORS_THEME = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  return { colorMode, toggleColorMode }
}

export const GET_IS_SMALL_SCREAM = () => {
  return useMediaQuery({
    query: '(max-width: 600px)',
  })
}

export const GET_STYLES_SCROLL = () => {
  const isSmallScream = GET_IS_SMALL_SCREAM()

  return {
    '&::-webkit-scrollbar': {
      display: isSmallScream ? 'none' : 'block',
    },
    msOverflowStyle: isSmallScream ? 'none' : 'block',
    scrollbarWidth: isSmallScream ? 'none' : 'block',
  }
}
