import { Button, useColorModeValue, type ButtonProps } from '@chakra-ui/react'

interface Props extends ButtonProps {}

const SimpleButton = ({ ...props }: Props) => {
  const colorScheme = useColorModeValue('light.primaryFull', 'dark.primaryFull')
  return (
    <Button
      colorScheme={colorScheme}
      {...props}
    />
  )
}

export default SimpleButton
