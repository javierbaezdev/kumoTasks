import { project } from '@/modules/projects/types'
import { CirclePlus, EditCircle, Trash } from '@/shared/Icons'
import { SimpleIconButton } from '@/shared/components/buttons'
import { GRADIENTS_BG, NO_DATA } from '@/shared/constant'
import { Badge, Flex, Icon, Text, useColorModeValue } from '@chakra-ui/react'

const stateDict: Record<string, any> = {
  ACTIVE: {
    label: 'Activo',
    colorScheme: 'purple',
  },
  INACTIVE: {
    label: 'Inactivo',
    colorScheme: 'yellow',
  },
}

interface props {
  project?: project
  isNew?: boolean
}

const MIN_H = 140

const ProjectCard = ({ project, isNew }: props) => {
  const bgCard = useColorModeValue(GRADIENTS_BG.LIGHT, GRADIENTS_BG.DARK)
  const bgHover = useColorModeValue('light.secondary.200', 'dark.secondary.200')

  return (
    <Flex
      bg={bgCard}
      p={2}
      borderRadius={8}
      direction='column'
      gap={2}
      minH={MIN_H}
      cursor={isNew ? 'pointer' : undefined}
      _hover={isNew ? { bg: bgHover } : undefined}
      onClick={isNew ? () => console.log('new') : undefined}
      align={isNew ? 'center' : undefined}
      justify='center'
    >
      {isNew && (
        <Flex
          align='center'
          gap={2}
        >
          <Icon fontSize={28}>
            <CirclePlus />
          </Icon>
          <Text
            noOfLines={[1]}
            fontSize='xl'
          >
            Agregar Nuevo proyecto
          </Text>
        </Flex>
      )}
      {!isNew && project && (
        <>
          <Flex
            justify='space-between'
            align='center'
          >
            <Text
              as='b'
              noOfLines={[1]}
            >
              {project.name}
            </Text>

            <Flex gap={2}>
              <SimpleIconButton
                icon={<EditCircle />}
                aria-label='edit'
                onClick={() => console.log('edit')}
                bg='transparent'
                _hover={{ bg: 'transparent', color: 'mediumPurple.300' }}
                size='xs'
              />
              <SimpleIconButton
                icon={<Trash />}
                aria-label='edit'
                onClick={() => console.log('edit')}
                bg='transparent'
                _hover={{ bg: 'transparent', color: 'mediumPurple.300' }}
                size='xs'
              />
            </Flex>
          </Flex>

          <Text noOfLines={[1, 2]}>
            {project?.description || NO_DATA.description}
          </Text>

          <Flex
            justify='flex-end'
            mt='auto'
          >
            <Badge
              variant='outline'
              colorScheme={stateDict[project.state]?.colorScheme}
              p={1}
              borderRadius={6}
              alignItems='center'
              display='flex'
            >
              {stateDict[project.state]?.label}
            </Badge>
          </Flex>
        </>
      )}
    </Flex>
  )
}

export default ProjectCard
