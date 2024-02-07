import { useProjectsStore } from '@/modules/projects/store'
import { Grid, GridItem } from '@chakra-ui/react'
import ProjectCard, { MIN_H } from '@/modules/projects/components/ProjectCard'
import { GET_STYLES_SCROLL } from '@/shared/constants'

const List = () => {
  const projects = useProjectsStore((store) => store.projects)
  return (
    <Grid
      templateColumns='repeat(auto-fill, minmax(min(100%, 25rem), 1fr))'
      gridTemplateRows={`repeat(auto-fill, ${MIN_H + 10}px)`}
      gap={2}
      w='full'
      overflow='auto'
      sx={GET_STYLES_SCROLL()}
      py={4}
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
