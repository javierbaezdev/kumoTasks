import * as Yup from 'yup'
import { SCHEMA_MESSAGES } from '@/shared/constants'

export const schema = Yup.object().shape({
  key: Yup.string().required(SCHEMA_MESSAGES.required),
  name: Yup.string()
    .required(SCHEMA_MESSAGES.required)
    .max(20, SCHEMA_MESSAGES.maxNum + 20),
  description: Yup.string().max(80, SCHEMA_MESSAGES.maxNum + 80),
  state: Yup.string().oneOf(['ACTIVE', 'INACTIVE'], SCHEMA_MESSAGES.required),
})
