import { COMBINED_COLORS } from '@/theme/combinedColors'
import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  useColorModeValue,
} from '@chakra-ui/react'
import Select from 'react-select'

export interface Item {
  value: string | number
  label: string
}

interface CustomAutocompleteProps {
  label: string
  value?: string
  list?: Item[]
  onChange: (value?: Item) => void
  errorMsg?: string
  isLoading?: boolean
  isDisabled?: boolean
}

const Autocomplete = ({
  label,
  value,
  onChange,
  errorMsg,
  isLoading,
  isDisabled,
  list = [],
}: CustomAutocompleteProps) => {
  const borderColor = useColorModeValue(
    COMBINED_COLORS.light.secondary[100],
    COMBINED_COLORS.dark.secondary[100]
  )
  const backgroundColorNoFocus = useColorModeValue(
    COMBINED_COLORS.light.secondary[200],
    COMBINED_COLORS.dark.secondary[200]
  )
  const backgroundColor = useColorModeValue(
    COMBINED_COLORS.light.secondary[300],
    COMBINED_COLORS.dark.secondary[300]
  )
  const colorText = useColorModeValue(
    COMBINED_COLORS.dark.primary[300],
    '#ffffff'
  )
  return (
    <Flex
      justify='center'
      align='center'
      w='full'
    >
      <FormControl
        isInvalid={Boolean(errorMsg)}
        pb={errorMsg ? 0 : 6}
      >
        <FormLabel fontWeight={500}>{label}</FormLabel>
        <Select
          className='basic-single'
          placeholder={
            isLoading
              ? `Cargando ${label.toLowerCase()}...`
              : `Seleccionar/Buscar ${label.toLowerCase()}`
          }
          value={value ? list?.find((item) => item.value === value) : undefined}
          name={label}
          options={list}
          onChange={(item) => (item ? onChange(item) : undefined)}
          styles={{
            control: (baseStyles) => ({
              ...baseStyles,
              '&:hover': { borderColor: borderColor },
              border: `1px solid ${borderColor}`,
              boxShadow: 'none',
              borderRadius: '0.375rem',
              background: backgroundColor,
              color: colorText,
              padding: 0,
              margin: 0,
            }),
            dropdownIndicator: (base) => ({
              ...base,
              background: 'transparent',
              color: colorText,
            }),
            option: (provided, state) => ({
              ...provided,

              backgroundColor: state.isFocused
                ? backgroundColor
                : backgroundColorNoFocus,
              '&:hover': {
                backgroundColor: backgroundColor,
                cursor: 'pointer',
              },
            }),
            menuList: (base) => ({
              ...base,
              padding: 0,
            }),
            placeholder: (base) => ({
              ...base,
              color: colorText,
            }),
            singleValue: (base) => ({
              ...base,
              color: colorText,
            }),
            noOptionsMessage: (base) => ({
              ...base,
              background: backgroundColor,
              color: colorText,
            }),
          }}
          isDisabled={isDisabled}
          isLoading={isLoading}
          noOptionsMessage={() => 'Sin Elementos encontrados'}
          isClearable={false}
          isRtl={false}
          isSearchable={true}
        />
        <FormErrorMessage>{errorMsg || ''}</FormErrorMessage>
      </FormControl>
    </Flex>
  )
}

export default Autocomplete
