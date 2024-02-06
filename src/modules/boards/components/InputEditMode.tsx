import { Input, InputProps, useColorModeValue } from '@chakra-ui/react'

interface props extends InputProps {}

const InputEditMode = ({ ...props }: props) => {
  const focusBorderColor = useColorModeValue(
    'light.primary.100',
    'dark.primary.200'
  )
  const borderColor = useColorModeValue(
    'light.secondary.100',
    'dark.secondary.100'
  )
  return (
    <Input
      autoFocus
      bg='transparent'
      size='xs'
      borderRadius={8}
      focusBorderColor={focusBorderColor}
      borderColor={borderColor}
      {...props}
    />
  )
}

export default InputEditMode
