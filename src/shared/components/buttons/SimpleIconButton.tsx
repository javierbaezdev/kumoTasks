import { IconButton, type IconButtonProps } from '@chakra-ui/react'

interface SimpleIconButtonProps extends IconButtonProps {}

const SimpleIconButton = ({ ...props }: SimpleIconButtonProps) => {
  return <IconButton {...props} />
}

export default SimpleIconButton
