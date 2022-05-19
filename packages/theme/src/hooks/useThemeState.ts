import { Dispatch, SetStateAction, useContext } from 'react'
import { ThemeContext } from '../theme/context'
import Theme from '../theme/Theme'

function useThemeState(): [Theme, Dispatch<SetStateAction<Theme>>] {
    return useContext(ThemeContext)
}

export default useThemeState