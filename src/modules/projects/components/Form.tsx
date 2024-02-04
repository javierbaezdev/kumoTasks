import { project } from '@/modules/projects/types'
import { useFormik } from 'formik'
import { initialValues } from '@/modules/projects/validations/initialValues'
import { schema } from '@/modules/projects/validations/schema'
import { Flex, Grid, GridItem } from '@chakra-ui/react'
import { SimpleInput, SimpleTextArea } from '@/shared/components/inputs'
import { SimpleButton } from '@/shared/components/buttons'
import { DeviceFloppy } from '@/shared/Icons'
import { useProjectsStore } from '../store'
import { generateId } from '@/shared/utils/generate'

interface Props {
  project?: project
  isCreate: boolean
  onClose: () => void
}

const Form = ({ project, isCreate, onClose }: Props) => {
  const { addProject, updateProject } = useProjectsStore((store) => store)
  const formik = useFormik<project>({
    initialValues:
      !isCreate && project ? project : { ...initialValues, key: generateId() },
    validationSchema: schema,
    validateOnMount: false,
    validateOnChange: true,
    onSubmit: async (values) => {
      if (isCreate) {
        addProject(values)
      }
      if (!isCreate) {
        updateProject(values)
      }
      onClose()
    },
  })

  return (
    <Grid
      templateColumns='repeat(1fr, 1)'
      gap={2}
    >
      <GridItem>
        <SimpleInput
          isRequired
          name='name'
          label='Nombre del proyecto'
          value={formik.values.name}
          errorMsg={formik.errors?.name}
          onChange={formik.handleChange}
        />
      </GridItem>
      <GridItem>
        <SimpleTextArea
          name='description'
          label='Descripción'
          value={formik.values?.description}
          errorMsg={formik.errors?.description}
          onChange={formik.handleChange}
        />
      </GridItem>
      <GridItem>
        <Flex
          justify='end'
          align='center'
          gap={2}
        >
          <SimpleButton
            variant='outline'
            onClick={() => onClose()}
          >
            Cancelar
          </SimpleButton>
          <SimpleButton
            leftIcon={<DeviceFloppy />}
            onClick={() => formik.handleSubmit()}
          >
            {isCreate ? 'Guardar' : 'Actualizar'}
          </SimpleButton>
        </Flex>
      </GridItem>
    </Grid>
  )
}

export default Form
