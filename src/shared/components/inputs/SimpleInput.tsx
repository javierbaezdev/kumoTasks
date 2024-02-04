import { useId } from 'react'
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputProps,
  InputRightElement,
  useColorModeValue,
} from '@chakra-ui/react'

interface Props extends InputProps {
  label: string
  errorMsg?: string
  leftElement?: JSX.Element
  rightElement?: JSX.Element
}

const SimpleInput = ({
  label,
  errorMsg,
  leftElement,
  rightElement,
  ...props
}: Props) => {
  const idInput = useId()
  const focusBorderColor = useColorModeValue(
    'light.secondary.200',
    'dark.secondary.200'
  )
  const borderColor = useColorModeValue(
    'light.secondary.100',
    'dark.secondary.100'
  )
  const handleScroll = (event: React.FormEvent<HTMLInputElement>) => {
    event.currentTarget.blur()
  }

  return (
    <FormControl
      isInvalid={Boolean(errorMsg)}
      pb={errorMsg ? 0 : 6}
    >
      <FormLabel
        htmlFor={idInput}
        fontWeight={500}
      >
        {label}
      </FormLabel>
      <InputGroup size='md'>
        {leftElement && <InputLeftElement>{leftElement}</InputLeftElement>}
        <Input
          id={idInput}
          focusBorderColor={focusBorderColor}
          borderColor={borderColor}
          onWheel={handleScroll}
          {...props}
        />
        {rightElement && <InputRightElement>{rightElement}</InputRightElement>}
      </InputGroup>
      <FormErrorMessage>{errorMsg || ''}</FormErrorMessage>
    </FormControl>
  )
}

export default SimpleInput
