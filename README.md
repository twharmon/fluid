# Fluid

![](https://github.com/twharmon/fluid/workflows/Test/badge.svg)

An __experimental__ css-in-js solution for React.

## Usage
Basic example:

### App.tsx

```tsx
import { useClasses, createStyles } from '@twharmon/fluid-css-in-js'
import { useTheme, Theme, darken } from '@twharmon/fluid-theme'

const makeStyles = (theme: Theme) => createStyles({
    root: {
        background: darken(theme.palette.primary, 0.5),
    },
})

function App() {
    const theme = useTheme()
    const classes = useClasses(() => makeStyles(theme), [theme])

    return (
        <div className={classes.root}>
            Hello, world!
        </div>
    )
}

export default App
```

### index.ts

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { createTheme, ThemeProvider } from '@twharmon/fluid-theme'

const root = ReactDOM.createRoot(document.getElementById('root')!)

const defaultTheme = createTheme({
    palette: {
        primary: '#009688',
        accent: '#9c27b0',
    },
    mode: 'dark',
})

root.render(
    <React.StrictMode>
        <ThemeProvider theme={defaultTheme}>
            <App />
        </ThemeProvider>
    </React.StrictMode>
)
```

## Contributing

Make a pull request.
