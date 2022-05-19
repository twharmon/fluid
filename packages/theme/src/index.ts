import useTheme from './hooks/useTheme'
import useThemeState from './hooks/useThemeState'
import useSetThemeState from './hooks/useSetThemeState'
import FluidRoot from './theme/context'
import Theme, { createTheme } from './theme/Theme'
import { darken, lighten, saturate, desaturate } from './theme/colors'

export {
    Theme,
    FluidRoot,
    createTheme,
    useTheme,
    useThemeState,
    useSetThemeState,

    darken,
    lighten,
    saturate,
    desaturate,
}
