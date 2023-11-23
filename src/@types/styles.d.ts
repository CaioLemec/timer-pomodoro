import 'styled-component'
import { defaultTheme } from '../styles/themes/default'

type ThemeType = typeof defaultTheme

declare module 'styled-components' {
  export interface defaultTheme extends ThemeType {}
}
