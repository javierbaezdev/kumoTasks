import { useProjectsStore } from '@/modules/projects/store'
import { Grid, GridItem } from '@chakra-ui/react'
import ProjectCard, { MIN_H } from '@/modules/projects/components/ProjectCard'
import { GET_IS_SMALL_SCREAM } from '@/shared/constants'

const List = () => {
  const projects = useProjectsStore((store) => store.projects)
  const isSmallScream = GET_IS_SMALL_SCREAM()
  return (
    <Grid
      templateColumns='repeat(auto-fill, minmax(min(100%, 25rem), 1fr))'
      gridTemplateRows={`repeat(auto-fill, ${MIN_H + 10}px)`}
      gap={2}
      w='full'
      overflow='auto'
      sx={{
        '&::-webkit-scrollbar': {
          display: isSmallScream ? 'none' : 'block',
        },
        msOverflowStyle: isSmallScream ? 'none' : 'block',
        scrollbarWidth: isSmallScream ? 'none' : 'block',
      }}
      pb={20}
    >
      <GridItem>
        <ProjectCard isNew={true} />
      </GridItem>
      {projects?.map((project) => (
        <GridItem key={project.key}>
          <ProjectCard project={project} />
        </GridItem>
      ))}
    </Grid>
  )
}

export default List
