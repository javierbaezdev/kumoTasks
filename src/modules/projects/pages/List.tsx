import { useProjectsStore } from '@/modules/projects/store'
import { Grid, GridItem } from '@chakra-ui/react'
import ProjectCard from '@/modules/projects/components/ProjectCard'

const List = () => {
  const projects = useProjectsStore((store) => store.projects)

  return (
    <Grid
      templateColumns='repeat(auto-fit, minmax(380px, 1fr))'
      gap={2}
      w='full'
      overflow='auto'
    >
      {projects?.map((project) => (
        <GridItem>
          <ProjectCard project={project} />
        </GridItem>
      ))}
      <GridItem>
        <ProjectCard isNew={true} />
      </GridItem>
    </Grid>
  )
}

export default List
