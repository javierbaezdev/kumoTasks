import * as Yup from 'yup'
import { SCHEMA_MESSAGES } from '@/shared/constants'

export const schema = Yup.object().shape({
  key: Yup.string().required(SCHEMA_MESSAGES.required),
  columnKey: Yup.string().required(SCHEMA_MESSAGES.required),
  projectKey: Yup.string().required(SCHEMA_MESSAGES.required),
  name: Yup.string()
    .required(SCHEMA_MESSAGES.required)
    .max(40, SCHEMA_MESSAGES.maxNum + 40),
  description: Yup.string().max(300, SCHEMA_MESSAGES.maxNum + 300),
})
