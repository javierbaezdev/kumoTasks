import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
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
  return (
    <Drawer
      isOpen={isOpen}
      {...props}
    >
      <DrawerOverlay />
      <DrawerContent py={4}>
        <DrawerCloseButton />
        {title && <DrawerHeader borderBottomWidth='1px'>{title}</DrawerHeader>}
        <DrawerBody mt={4}>{children}</DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}

export default SimpleDrawer
