export interface ColorShadesBase {
  '100': string
  '200': string
  '300': string
}

export interface ColorShadesCompleted extends ColorShadesBase {
  '50': string
  '400': string
  '500': string
  '600': string
  '700': string
  '800': string
  '900': string
  '950': string
}

export interface ColorsShadesMode {
  primary: ColorShadesBase
  secondary: ColorShadesBase
}
