import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useColorModeValue,
  type DrawerProps,
} from '@chakra-ui/react'

interface SimpleDrawerProps extends DrawerProps {
  title?: string | JSX.Element
  children: JSX.Element
}

const SimpleDrawer = ({
  title,
  children,
  isOpen,
  ...props
}: SimpleDrawerProps) => {
  const bgAside = useColorModeValue('light.secondary.300', 'dark.secondary.300')
  return (
    <Drawer
      isOpen={isOpen}
      {...props}
    >
      <DrawerOverlay />
      <DrawerContent
        py={4}
        bg={bgAside}
      >
        <DrawerCloseButton />
        {title && <DrawerHeader borderBottomWidth='1px'>{title}</DrawerHeader>}
        <DrawerBody
          mt={4}
          justifyContent='space-between'
          display='flex'
          flexDirection='column'
        >
          {children}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}

export default SimpleDrawer
