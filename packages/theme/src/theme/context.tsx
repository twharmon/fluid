import React, { createContext, Dispatch, PropsWithChildren, SetStateAction, useState } from 'react'
import Theme, { createTheme } from './Theme'

export const ThemeContext = createContext<[Theme, Dispatch<SetStateAction<Theme>>]>([createTheme(), () => {}])

function FluidRoot(props: PropsWithChildren<{ theme?: Theme }>) {
    const [theme, setTheme] = useState(props.theme ?? createTheme())

    return (
        <ThemeContext.Provider value={[theme, setTheme]}>
            {props.children}
        </ThemeContext.Provider>
    )
}

export default FluidRoot
