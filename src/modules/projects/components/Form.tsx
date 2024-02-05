import { project } from '@/modules/projects/types'
import { useFormik } from 'formik'
import { initialValues } from '@/modules/projects/validations/initialValues'
import { schema } from '@/modules/projects/validations/schema'
import { Flex, Grid, GridItem, useColorModeValue } from '@chakra-ui/react'
import { SimpleInput, SimpleTextArea } from '@/shared/components/inputs'
import { SimpleButton } from '@/shared/components/buttons'
import { DeviceFloppy } from '@/shared/Icons'
import { useProjectsStore } from '../store'
import { useId } from 'react'

interface Props {
  project?: project
  isCreate: boolean
  onClose: () => void
}

const Form = ({ project, isCreate, onClose }: Props) => {
  const { addProject, updateProject } = useProjectsStore((store) => store)
  const bgSwitch = useColorModeValue('light.primary.100', 'dark.primary.200')
  const key = useId()
  const formik = useFormik<project>({
    initialValues: !isCreate && project ? project : { ...initialValues, key },
    validationSchema: schema,
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
      {!isCreate && (
        <GridItem>
          <Flex
            gap={2}
            align='center'
            borderRadius={8}
            border='1px solid'
            borderColor={bgSwitch}
            p={1}
          >
            {['ACTIVE', 'INACTIVE'].map((state) => (
              <Flex
                w='full'
                justify='center'
                cursor='pointer'
                borderRadius={8}
                p={1}
                bg={formik.values.state === state ? bgSwitch : undefined}
                onClick={() => formik.setFieldValue('state', state)}
              >
                {state === 'ACTIVE' ? 'Activo' : 'Inactivo'}
              </Flex>
            ))}
          </Flex>
        </GridItem>
      )}
      <GridItem mt={2}>
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
            isDisabled={!formik.isValid}
          >
            {isCreate ? 'Guardar' : 'Actualizar'}
          </SimpleButton>
        </Flex>
      </GridItem>
    </Grid>
  )
}

export default Form
