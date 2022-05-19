import { Dispatch, SetStateAction } from 'react'
import Theme from '../theme/Theme'
import useThemeState from './useThemeState'

function useSetThemeState(): Dispatch<SetStateAction<Theme>> {
    const [, setTheme] = useThemeState()
    return setTheme
}

export default useSetThemeState