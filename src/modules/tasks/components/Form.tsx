import { useParams } from 'react-router-dom'
import { TasksBoard } from '../types'
import { useTasksStore } from '../store'
import { useFormik } from 'formik'
import { useId, useState } from 'react'
import { initialValues } from '@/modules/tasks/validations/initialValues'
import { schema } from '@/modules/tasks/validations/schema'
import { Flex, Grid, GridItem } from '@chakra-ui/react'
import { SimpleInput, SimpleTextArea } from '@/shared/components/inputs'
import { SimpleButton } from '@/shared/components/buttons'
import { DeviceFloppy } from '@/shared/Icons'
import ViewMode from './ViewMode'

interface Props {
  task?: TasksBoard
  columnKey: string
  onClose: () => void
}

const Form = ({ task, columnKey, onClose }: Props) => {
  const { projectKey } = useParams()
  const { addTask, updateTask } = useTasksStore((state) => state)
  const [editMode, setEditMode] = useState(() => Boolean(task))
  const key = useId()

  const formik = useFormik<TasksBoard>({
    initialValues: task
      ? task
      : { ...initialValues, key, columnKey, projectKey: projectKey || '' },
    validationSchema: schema,
    onSubmit: async (values) => {
      if (!task) {
        addTask(values)
      }
      if (task) {
        updateTask(values, false)
      }
      onClose()
    },
  })

  const toggleEditMode = () => {
    setEditMode((prev) => !prev)
  }

  return (
    <>
      {editMode && task && (
        <ViewMode
          task={task}
          showEditMode={toggleEditMode}
        />
      )}
      {!editMode && (
        <Grid
          templateColumns='repeat(1fr, 1)'
          gap={2}
        >
          <GridItem>
            <SimpleInput
              isRequired
              name='name'
              label='Titulo de la tarea'
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
                isDisabled={!formik.isValid}
              >
                {!task ? 'Guardar' : 'Actualizar'}
              </SimpleButton>
            </Flex>
          </GridItem>
        </Grid>
      )}
    </>
  )
}

export default Form
