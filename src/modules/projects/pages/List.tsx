import { useProjectsStore } from '@/modules/projects/store'
import { GET_IS_SMALL_SCREAM } from '@/shared/constant'
import { Grid, GridItem } from '@chakra-ui/react'
import ProjectCard from '@/modules/projects/components/ProjectCard'

const List = () => {
  const projects = useProjectsStore((store) => store.projects)
  const isSmallScream = GET_IS_SMALL_SCREAM()
  return (
    <Grid
      templateColumns={`repeat(${!isSmallScream ? '3' : '1'}, 1fr)`}
      gap={2}
      w='full'
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
