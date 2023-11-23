import { ThemeProvider } from 'styled-components'
import { defaultTheme } from './styles/themes/default'
import { GlobalStyle } from './@types/global'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <h1>hellow</h1>

      <GlobalStyle />
    </ThemeProvider>
  )
}
