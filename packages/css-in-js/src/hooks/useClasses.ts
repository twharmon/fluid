import { useLayoutEffect, useState, CSSProperties } from 'react'
import { cssToStr } from './utils'

export type CSSProps = CSSProperties | {
    [key: string]: CSSProps
}

export type ClassNameMap<ClassKey extends string = string> = Record<ClassKey, string>

export type Styles<ClassKey extends string = string> = Record<ClassKey, CSSProperties | CSSProps>

let counter = 0

export const PREFIX = 'Fluid'

function useClasses<ClassKey extends string>(make: () => Styles<ClassKey>, deps: any[]): ClassNameMap<ClassKey> {
    const [classes, setClasses] = useState<ClassNameMap<ClassKey>>({} as ClassNameMap<ClassKey>)

    useLayoutEffect(() => {
        counter++
        const style = document.createElement('style')
        const classes = {} as ClassNameMap<ClassKey>
        let i = 0
        const css = make()
        for (const prop in css) {
            i++
            classes[prop] = `${PREFIX}-${counter}-${i}`
            style.innerText += cssToStr(classes[prop], css[prop])
        }
        document.head.appendChild(style)
        setClasses(classes)
        return () => {
            document.head.removeChild(style)
        }
    }, deps)

    return classes
}

export default useClasses
