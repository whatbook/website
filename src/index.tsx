import React from 'react'
import ReactDOM from 'react-dom'
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import purple from '@material-ui/core/colors/purple'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import 'app/utils/bootstrap'

console.log('这里', process.env)
const theme = createMuiTheme({
  palette: {
    primary: { main: '#5A2666' }, // Purple and green play nicely together.
    secondary: { main: '#11cb5f' }, // This is just green.A700 as hex.
  },
  typography: { useNextVariants: true },
})
console.log(theme)
ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
