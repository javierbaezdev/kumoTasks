import {
  Alert,
  AlertIcon,
  Box,
  AlertTitle,
  AlertDescription
} from '@chakra-ui/react'

interface MessageProps {
  type: 'info' | 'warning' | 'error'
  msg: string
  description?: string
}

const Message = ({ type, msg, description }: MessageProps) => {
  return (
    <Alert status={type} borderRadius={12} p={4}>
      <AlertIcon />
      <Box>
        <AlertTitle>{msg}</AlertTitle>
        {description && <AlertDescription>{description}</AlertDescription>}
      </Box>
    </Alert>
  )
}

export default Message
