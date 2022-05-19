export interface Theme {
    palette: {
        primary: string
        accent: string
    }
    mode: 'light' | 'dark'
    rounded: number
    spacing: number
}

export default Theme

const defaultTheme: Theme = {
    palette: {
        primary: '#009688',
        accent: '#9c27b0',
    },
    mode: 'light',
    rounded: 0,
    spacing: 10,
}

type DeepPartial<T> = T extends object ? {
    [P in keyof T]?: DeepPartial<T[P]>
} : T

export function createTheme(theme: DeepPartial<Theme> = {}): Theme {
    return {
        ...defaultTheme,
        ...theme,
        palette: {
            ...defaultTheme.palette,
            ...theme.palette,
        },
    }
}
