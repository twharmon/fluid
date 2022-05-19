import Theme from '../theme/Theme'
import useThemeState from './useThemeState'

function useTheme(): Theme {
    const [theme] = useThemeState()
    return theme
}

export default useTheme