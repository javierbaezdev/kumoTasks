import { SimpleIconButton } from '@/shared/components/buttons'
import { useMainLayoutStore } from './store'
import { Menu } from '@/shared/Icons'

const MobileButton = () => {
  const { onToggleMobile } = useMainLayoutStore((store) => store)
  return (
    <SimpleIconButton
      icon={<Menu />}
      aria-label='onToggle'
      onClick={() => onToggleMobile()}
      borderRadius='50%'
      position='fixed'
      top='5px'
      left='5px'
      size='md'
    />
  )
}

export default MobileButton
